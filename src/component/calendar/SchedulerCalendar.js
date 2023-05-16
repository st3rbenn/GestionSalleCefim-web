import React, { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import { useAppThunkDispatch } from "../../store";
import { getAllCampuses } from "../../store/mainslice";
import { useSelector } from "react-redux";
import { getDayDates, getWeekDates } from "../../utils/date.utils";
import { promotions } from "../../utils/data.utils";
import SchedulerTable from "./SchedulerTable";
import SchedulerHeader from "./SchedulerHeader";

// À l'extérieur de votre composant de rendu, préparez les données :
const allEvents = promotions.reduce((acc, { rooms, building }) => {
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
allEvents.sort((a, b) => {
	if (a.date === b.date) {
		return a.time === "Matin" ? -1 : 1;
	}
	return new Date(a.date) - new Date(b.date);
});

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

			{/* {viewMode === "day" && (
				<Grid
					gutter="xs"
					style={{
						borderTop: "1px solid black",
						borderLeft: "1px solid black",
					}}
				>
					<Col
						span={2}
						style={{
							borderBottom: "1px solid black",
							borderRight: "1px solid black",
						}}
					>
						<Paper padding="xs" shadow="xs" style={{ textAlign: "center" }}>
							{dayDates}
						</Paper>
					</Col>
					{Array.from({ length: 10 }, (_, i) => i + 8).map((hour) => (
						<Col
							span={2}
							style={{
								borderBottom: "1px solid black",
								borderRight: "1px solid black",
								width: "10%",
								fontSize: "0.6rem",
								padding: 0,
							}}
							key={hour}
						>
							<Paper padding="xs" shadow="xs" style={{ textAlign: "center" }}>
								{hour}:00 - {hour + 1}:00
							</Paper>
						</Col>
					))}
					{promotions.map(({ room, promo }) => (
						<>
							<Col
								span={2}
								style={{
									borderBottom: "1px solid black",
									borderRight: "1px solid black",
									cursor: "pointer",
								}}
								onClick={() =>
									setOpenRooms((prev) => ({ ...prev, [room]: !prev[room] }))
								}
							>
								<Paper padding="xs" shadow="xs">
									{room}
								</Paper>
							</Col>
							{weekDates.map(() => (
								<>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
										}}
									/>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
										}}
									/>
								</>
							))}
							{openRooms[room] &&
								promo.map(({ name }) => (
									<>
										<Col
											span={2}
											style={{
												borderBottom: "1px solid black",
												borderRight: "1px solid black",
												paddingLeft: "2rem",
											}}
										>
											<Paper padding="xs" shadow="xs">
												{name}
											</Paper>
										</Col>
										{weekDates.map(() => (
											<>
												<Col
													span={1}
													style={{
														borderBottom: "1px solid black",
														borderRight: "1px solid black",
														width: "10rem",
														height: "5rem",
													}}
												/>
												<Col
													span={1}
													style={{
														borderBottom: "1px solid black",
														borderRight: "1px solid black",
														width: "10rem",
														height: "5rem",
													}}
												/>
											</>
										))}
									</>
								))}
						</>
					))}
				</Grid>
			)} */}

			{viewMode === "week" && (
				<SchedulerTable
					weekDates={weekDates}
					openRooms={openRooms}
					setOpenRooms={setOpenRooms}
					allEvents={allEvents}
					key="week"
				/>
			)}
		</Paper>
	);
};

export default ScheduleCalendar;
