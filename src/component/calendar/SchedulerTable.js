import { Col, Grid, Paper, Text } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getWeekDates } from "../../utils/date.utils";
import { promotions } from "../../utils/data.utils";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CustomEvent from "./CustomEvent";

function SchedulerTable({ weekDates, openRooms, setOpenRooms, allEvents }) {
	const openBuildings = Object.entries(openRooms)
		.filter(([_, isOpen]) => isOpen)
		.map(([building, _]) => building);

	const displayEvents = (date, time) => {
		return allEvents.filter((event) => {
			const date1 = moment(event.date, "YYYY-MM-DD");
			const date2 = moment(date, "DD/MM/YYYY");
			return date1.isSame(date2, "day") && event.time === time;
		});
	};

	const handleClickEvent = (data) => {
		// console.log the current event name
		console.log(data);
	};

	useEffect(() => {
		console.log(allEvents);
	}, [allEvents]);

	return (
		<Grid
			gutter="xs"
			style={{
				borderTop: "1px solid black",
				borderLeft: "1px solid black",
			}}
		>
			<Col
				id="empty-cell"
				span={2}
				style={{
					borderBottom: "1px solid black",
					borderRight: "1px solid black",
					padding: 0,
				}}
			></Col>
			{weekDates.map((date, index) => (
				<Col
					span={2}
					key={index}
					style={{
						borderBottom: "1px solid black",
						borderRight: "1px solid black",
						textAlign: "center",
						padding: 0,
					}}
				>
					{date}
				</Col>
			))}

			<Col
				id="empty-cell"
				span={2}
				style={{
					borderBottom: "1px solid black",
					borderRight: "1px solid black",
					padding: 0,
				}}
			></Col>
      
			{weekDates.map((weekDate, _) => (
				<React.Fragment key={_}>
					<Col
						span={1}
						style={{
							borderBottom: "1px solid black",
							borderRight: "1px solid black",
							textAlign: "center",
							fontSize: "0.6rem",
							padding: 0,
						}}
					>
						Matin
					</Col>
					<Col
						span={1}
						style={{
							borderBottom: "1px solid black",
							borderRight: "1px solid black",
							textAlign: "center",
							fontSize: "0.6rem",
							padding: 0,
						}}
					>
						Après-midi
					</Col>
				</React.Fragment>
			))}

      {/* SHOW ALL BUILDING AVAILABALE */}
			{promotions.map(({ building, rooms }) => (
				<React.Fragment key={building + rooms}>
					<Col
						span={2}
						style={{
							borderBottom: "1px solid black",
							borderRight: "1px solid black",
							cursor: "pointer",
							display: "flex",
							alignItems: "baseline",
						}}
						onClick={() =>
							setOpenRooms((prev) => ({
								...prev,
								[building]: !prev[building],
							}))
						}
						key={building}
					>
						{openRooms[building] ? (
							<AiOutlineMinus
								style={{
									marginRight: "0.5rem",
								}}
							/>
						) : (
							<AiOutlinePlus
								style={{
									marginRight: "0.5rem",
								}}
							/>
						)}
						<Text>{building}</Text>
					</Col>

					{/* WHEN BUILDING CLOSED */}
					{weekDates.map((weekDate) => (
						<React.Fragment key={weekDate}>
							{openBuildings.includes(building) ? (
								<>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
											padding: 0,
										}}
									></Col>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
											padding: 0,
										}}
									></Col>
								</>
							) : (
								<>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
											padding: 0,
											overflow: "hidden",
										}}
									>
										{allEvents
											.filter((data) => {
												const date1 = moment(data.date, "YYYY-MM-DD");
												const date2 = moment(weekDate, "DD/MM/YYYY");
												return (
													date1.isSame(date2, "day") &&
													data.time === "Matin" &&
													data.building === building
												);
											})
											.map((data) => (
												<CustomEvent
													name={data.name}
													color={data.color}
													onClickEvent={handleClickEvent}
													data={data}
													key={data.name + data.time}
												/>
											))}
									</Col>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
											padding: 0,
											overflow: "hidden",
										}}
									>
										{allEvents
											.filter((data) => {
												const date1 = moment(data.date, "YYYY-MM-DD");
												const date2 = moment(weekDate, "DD/MM/YYYY");
												return (
													date1.isSame(date2, "day") &&
													data.time === "Après-midi" &&
													data.building === building
												);
											})
											.map((data) => (
												<CustomEvent
													name={data.name}
													color={data.color}
													onClickEvent={handleClickEvent}
													data={data}
													key={data.name + data.time}
												/>
											))}
									</Col>
								</>
							)}
						</React.Fragment>
					))}

					{/* WHEN BUILDING OPENED */}
					{openBuildings.includes(building) &&
						rooms.map(({ name, promotion }) => (
							<React.Fragment key={name}>
								<Col
									span={2}
									style={{
										borderBottom: "1px solid black",
										borderRight: "1px solid black",
										paddingLeft: "2rem",
									}}
								>
									{name + " :"}
								</Col>
								{weekDates.map((weekDate) => (
									<React.Fragment key={weekDate}>
										<Col
											span={1}
											style={{
												borderBottom: "1px solid black",
												borderRight: "1px solid black",
												width: "10rem",
												height: "5rem",
												padding: 0,
												overflow: "hidden",
											}}
										>
											{promotion &&
												promotion.map(({ events }) =>
													events
														.filter((data) => {
															const date1 = moment(data.date, "YYYY-MM-DD");
															const date2 = moment(weekDate, "DD/MM/YYYY");
															return (
																date1.isSame(date2, "day") &&
																data.time === "Matin" &&
																data.building === building
															);
														})
														.map((data) => (
															<CustomEvent
																name={data.name}
																color={data.color}
																onClickEvent={handleClickEvent}
																data={data}
																key={data.name + data.time}
															/>
														))
												)}
										</Col>
										<Col
											span={1}
											style={{
												borderBottom: "1px solid black",
												borderRight: "1px solid black",
												width: "10rem",
												height: "5rem",
												padding: 0,
												overflow: "hidden",
											}}
										>
											{promotion &&
												promotion.map(({ events }) =>
													events
														.filter((data) => {
															const date1 = moment(data.date, "YYYY-MM-DD");
															const date2 = moment(weekDate, "DD/MM/YYYY");
															return (
																date1.isSame(date2, "day") &&
																data.time === "Après-midi" &&
																data.building === building
															);
														})
														.map((data) => (
															<CustomEvent
																name={data.name}
																color={data.color}
																onClickEvent={handleClickEvent}
																data={data}
																key={data.name + data.time}
															/>
														))
												)}
										</Col>
									</React.Fragment>
								))}
							</React.Fragment>
						))}
				</React.Fragment>
			))}
		</Grid>
	);
}

export default SchedulerTable;
