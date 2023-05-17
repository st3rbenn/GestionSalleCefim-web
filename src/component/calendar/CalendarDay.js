import React, { useState } from "react";
import { Grid, Col, Text } from "@mantine/core";
import moment from "moment";
import CustomEvent from "./CustomEvent";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { promotions } from "../../utils/data.utils";

const CalendarDay = ({ allEvents, openRooms, setOpenRooms, dayDates }) => {
	const hours = [];
	for (let i = 8; i <= 17; i++) {
		hours.push(i);
	}

	const openBuildings = Object.entries(openRooms)
		.filter(([_, isOpen]) => isOpen)
		.map(([building, _]) => building);

	const handleClickEvent = (data) => {
		console.log(data);
	};

	return (
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
					textAlign: "center",
					fontSize: "0.6rem",
					padding: 0,
				}}
			></Col>
			<Col
				span={10}
				style={{
					borderBottom: "1px solid black",
					borderRight: "1px solid black",
					textAlign: "center",
					padding: 0,
				}}
			>
				{dayDates}
			</Col>

			<Col
				span={2}
				style={{
					borderBottom: "1px solid black",
					borderRight: "1px solid black",
					textAlign: "center",
					fontSize: "0.6rem",
					padding: 0,
				}}
			></Col>
			{hours.map((hour) => (
				<Col
					key={hour}
					span={1}
					style={{
						borderBottom: "1px solid black",
						borderRight: "1px solid black",
						textAlign: "center",
						fontSize: "0.6rem",
						padding: 0,
					}}
				>
					{hour}:00
				</Col>
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
					{hours.map((hour) =>
						openBuildings.includes(building) ? (
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
							</>
						) : (
							<Col
								key={hour}
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
								{!openBuildings.includes(building) && (
									<>
										{allEvents
											.filter((event) => {
												const date1 = moment(event.date, "YYYY-MM-DD");
												const date2 = moment(dayDates, "DD/MM/YYYY");
												const isSameHour = event.hour === hour + "h00";
												return (
													date1.isSame(date2, "day") &&
													isSameHour &&
													event.building === building
												);
											})
											.map((event) => (
												<CustomEvent
													key={event.name + event.time}
													name={event.name}
													color={event.color}
													onClickEvent={handleClickEvent}
													data={event}
												/>
											))}
									</>
								)}
							</Col>
						)
					)}

					{/* WHEN BUILDING OPEN */}
					{openBuildings.includes(building) &&
						rooms.map(({ name, promotion }) => (
							<React.Fragment key={name + promotion}>
								<Col
									span={2}
									style={{
										borderBottom: "1px solid black",
										borderRight: "1px solid black",
										paddingLeft: "2rem",
                    fontSize: ".8rem",
									}}
									key={name}
								>
									<Text>{name + " :"}</Text>
								</Col>

								{hours.map((hour) => (
									<Col
										key={hour}
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
														const date2 = moment(dayDates, "DD/MM/YYYY");
														const isSameHour = data.hour === hour + "h00";
														return (
															date1.isSame(date2, "day") &&
                              isSameHour &&
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
								))}
							</React.Fragment>
						))}

					{/* {openBuildings.includes(building) &&
						rooms.map(({ name, promotion }) => (
							<React.Fragment key={name + promotion}>
								<Col
									span={2}
									style={{
										borderBottom: "1px solid black",
										borderRight: "1px solid black",
										paddingLeft: "2rem",
									}}
									key={name}
								>
									<Text>{name + " :"}</Text>
								</Col>

								{hours.map((hour) => (
									<Col
										key={hour}
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
											promotion
												.filter((event) => {
													const date1 = moment(event.date, "YYYY-MM-DD");
													const date2 = moment(dayDates, "DD/MM/YYYY");
													const isSameHour = event.hour === hour + "h00";
													return (
														date1.isSame(date2, "day") &&
														isSameHour &&
														event.building === building
													);
												})
												.map((event) => (
													<CustomEvent
														key={event.name + event.time + event.hour}
														name={event.name}
														color={event.color}
														onClickEvent={handleClickEvent}
														data={event}
													/>
												))}
									</Col>
								))}
							</React.Fragment>
						))} */}
				</React.Fragment>
			))}
		</Grid>
	);
};

export default CalendarDay;
