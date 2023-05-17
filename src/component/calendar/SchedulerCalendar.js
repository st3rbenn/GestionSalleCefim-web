import React, { useEffect, useState } from "react";
import { Table, Button, Col, Grid, Paper, Flex, Text } from "@mantine/core";
import { useAppThunkDispatch } from "../../store";
import { getAllCampuses } from "../../store/mainslice";
import { useSelector } from "react-redux";
import { getDayDates, getWeekDates } from "../../utils/date.utils";
import { promotions } from "../../utils/data.utils";
import SchedulerTable from "./SchedulerTable";
import SchedulerHeader from "./SchedulerHeader";
import CalendarDay from "./CalendarDay";
import moment from "moment";

// À l'extérieur de votre composant de rendu, préparez les données :
const allEventsWeek = promotions.reduce((acc, { rooms, building }) => {
	const roomEvents = rooms.reduce((roomAcc, { promotion }) => {
		const promotionEvents = promotion.reduce((promoAcc, { events }) => {
			return [...promoAcc, ...events];
		}, []);
		return [...roomAcc, ...promotionEvents];
	}, []);
  //add building name to each event
  roomEvents.forEach((event) => {
    event.building = building;
  })
	return [...acc, ...roomEvents];
}, []);

// Trier par date et moment de la journée (Matin vient avant Après-midi)
allEventsWeek.sort((a, b) => {
	if (a.date === b.date) {
		return a.time === "Matin" ? -1 : 1;
	}
	return new Date(a.date) - new Date(b.date);
});

const allEventsDay = promotions.reduce((acc, { rooms, building }) => {
  const roomEvents = rooms.reduce((roomAcc, { promotion }) => {
    const promotionEvents = promotion.reduce((promoAcc, { events }) => {
      return [...promoAcc, ...events];
    }, []);
    return [...roomAcc, ...promotionEvents];
  }, []);
  // Add building name to each event
  roomEvents.forEach((event) => {
    event.building = building;
    event.room = rooms[0].name;
  });
  return [...acc, ...roomEvents];
}, []);

// Sort by date and time
allEventsDay.sort((a, b) => {
  const dateDiff = new Date(a.date) - new Date(b.date);
  if (dateDiff !== 0) {
    return dateDiff;
  }
  const timeA = moment(a.time, 'HH:mm');
  const timeB = moment(b.time, 'HH:mm');
  return timeA.isBefore(timeB) ? -1 : (timeA.isAfter(timeB) ? 1 : 0);
});

// Function to generate hours in a day
const generateHours = (start, end) => {
  let hours = [];
  for(let i = start; i <= end; i++) {
    hours.push(i + ":00");
  }
  return hours;
};

// All day hours from 8:00 to 20:00
const dayHours = generateHours(8, 20);

const ScheduleCalendar = () => {
	const [currentWeek, setCurrentWeek] = useState(0);
	const weekDates = getWeekDates(currentWeek);
	const dayDates = getDayDates(currentWeek);
	const [viewMode, setViewMode] = useState("week");
	const dispatch = useAppThunkDispatch();
	const allCampuses = useSelector((state) => state.campuses);

	const [openRooms, setOpenRooms] = useState({});

	const getAllCampus = async () => {
		const response = await dispatch(getAllCampuses());
		if (response.meta.requestStatus === "fulfilled") {
			console.log(allCampuses);
		}
	};

	useEffect(() => {
		getAllCampus();
	}, []);

	const previousWeek = () => {
		setCurrentWeek(currentWeek - 1);
	};

	const nextWeek = () => {
		setCurrentWeek(currentWeek + 1);
	};

	const handleSwitchView = (view) => {
		setViewMode(view);
		setOpenRooms({});
	};

	return (
		<Paper
			sx={{
				overflowX: "none",
				width: "80%",
				marginLeft: "auto",
				marginRight: "auto",
			}}
		>
			<SchedulerHeader
				handleSwitchView={handleSwitchView}
				previousWeek={previousWeek}
				nextWeek={nextWeek}
			/>

      {viewMode === "day" && (
        <CalendarDay
          dayDates={dayDates}
          openRooms={openRooms}
          setOpenRooms={setOpenRooms}
          allEvents={allEventsDay}
          key="day"
        />
      )}

			{viewMode === "week" && (
				<SchedulerTable
					weekDates={weekDates}
					openRooms={openRooms}
					setOpenRooms={setOpenRooms}
					allEvents={allEventsWeek}
					key="week"
				/>
			)}
		</Paper>
	);
};

export default ScheduleCalendar;
