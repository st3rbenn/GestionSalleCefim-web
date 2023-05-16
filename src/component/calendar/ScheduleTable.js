import React, { useEffect, useState } from "react";
import { Table, Button, Col, Grid, Paper, Flex, Text } from "@mantine/core";
import { useAppThunkDispatch } from "../../store";
import { getAllCampuses } from "../../store/mainslice";
import { useSelector } from "react-redux";
import moment from "moment";

// const promotions = [
// 	{
// 		room: "Salle Arobase",
// 		promo: [
// 			{
// 				name: "Dev Web",
// 			},
// 			{
// 				name: "Design",
// 			},
// 		],
// 	},
// 	{
// 		room: "Salle Cookie",
// 		promo: [
// 			{
// 				name: "Dev Web",
// 			},
// 			{
// 				name: "Design",
// 			},
// 		],
// 	},
// 	{
// 		room: "Salle Hashtag",
// 		promo: [
// 			{
// 				name: "Dev Web",
// 			},
// 			{
// 				name: "Design",
// 			},
// 		],
// 	},
// ];

const promotions = [
	{
		building: "CEFIM",
		rooms: [
			{
				name: "Salle Cookie",
				promotion: [
					{
						name: "Promo 1",
						events: [
							{
								id: 1,
								name: "Event 1",
								date: "2023-05-20",
								time: "Matin",
								color: "red",
							},
						],
					},
				],
			},
			{
				name: "Salle Hashtag",
				promotion: [
					{
						name: "Promo 2",
						events: [
							{
								id: 2,
								name: "Event 2",
								date: "2023-05-21",
								time: "Après-midi",
								color: "blue",
							},
							{
								id: 2,
								name: "Event 3",
								date: "2023-05-21",
								time: "Matin",
								color: "cyan",
							},
						],
					},
				],
			},
		],
	},
	{
		building: "MAME",
		rooms: [
			{
				name: "Salle Roberta Williams",
				promotion: [
					{
						name: "Promo 3",
						events: [
							{
								id: 3,
								name: "Event 3",
								date: "2023-05-22",
								time: "Matin",
							},
							// d'autres événements
						],
					},
					// d'autres promotions
				],
			},
		],
	},
];

// À l'extérieur de votre composant de rendu, préparez les données :
const allEvents = promotions.reduce((acc, { rooms }) => {
	const roomEvents = rooms.reduce((roomAcc, { promotion }) => {
		const promotionEvents = promotion.reduce((promoAcc, { events }) => {
			return [...promoAcc, ...events];
		}, []);
		return [...roomAcc, ...promotionEvents];
	}, []);
	return [...acc, ...roomEvents];
}, []);

// Trier par date et moment de la journée (Matin vient avant Après-midi)
allEvents.sort((a, b) => {
	if (a.date === b.date) {
		return a.time === "Matin" ? -1 : 1;
	}
	return new Date(a.date) - new Date(b.date);
});

function getWeekDates(weekOffset) {
	const dates = [];
	const today = new Date();
	let dayOfWeek = today.getDay(); // 0 (dimanche) - 6 (samedi)
	const offsetDays = weekOffset * 7;

	for (let i = 0; i < 5; i++) {
		// 5 jours de la semaine
		const date = new Date();
		date.setDate(today.getDate() + ((i + 7 - dayOfWeek) % 7) + offsetDays);
		dates.push(date.toLocaleDateString("fr-FR"));
	}

	return dates;
}

function getDayDates(dayOffset) {
	//affiche juste la date d'aujourd'hui
	const today = new Date();
	const date = new Date();
	date.setDate(today.getDate() + dayOffset);
	return date.toLocaleDateString("fr-FR");
}

const ScheduleTable = () => {
	const [currentWeek, setCurrentWeek] = useState(0);
	const weekDates = getWeekDates(currentWeek);
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

		if (view === "day") {
			console.log("fetching campus");
		}
	};

	useEffect(() => {
		console.log(openRooms);
	}, [openRooms]);

	return (
		<Paper
			sx={{
				overflowX: "none",
				width: "80%",
				marginLeft: "auto",
				marginRight: "auto",
			}}
		>
			<Grid
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 10,
					paddingLeft: 30,
					paddingTop: 30,
					paddingRight: 30,
				}}
			>
				<Grid.Col span={6}>
					<Button
						onClick={previousWeek}
						style={{
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							marginLeft: 7,
						}}
					>
						&lt;
					</Button>
					<Button
						onClick={nextWeek}
						style={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						}}
					>
						&gt;
					</Button>
				</Grid.Col>
				<Grid.Col
					span={6}
					display="flex"
					style={{
						justifyContent: "right",
					}}
				>
					<Button
						onClick={() => handleSwitchView("day")}
						style={{
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							marginLeft: 7,
						}}
					>
						Day
					</Button>
					<Button
						onClick={() => handleSwitchView("week")}
						style={{
							borderRadius: 0,
						}}
					>
						Week
					</Button>
					{/* <Button
						onClick={() => handleSwitchView("month")}
						style={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						}}
					>
						Month
					</Button> */}
				</Grid.Col>
			</Grid>

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
					{weekDates.map(() => (
						<>
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
						</>
					))}

					{promotions.map(({ building, rooms }) => (
						<>
							<Col
								span={2}
								style={{
									borderBottom: "1px solid black",
									borderRight: "1px solid black",
									cursor: "pointer",
								}}
								onClick={() =>
									setOpenRooms((prev) => ({
										...prev,
										[building]: !prev[building],
									}))
								}
							>
								{building}
							</Col>

							{weekDates.map((weekDate) => (
								<>
									{openRooms !== undefined && openRooms[building] ? (
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
												}}
											>
												{allEvents
													.filter(({ date, time }) => {
														const date1 = moment(date, "YYYY-MM-DD");
														const date2 = moment(weekDate, "DD/MM/YYYY");
														return (
															date1.isSame(date2, "day") && time === "Matin"
														);
													})
													.map(({ name, color }) => (
														<Paper
															padding="xs"
															shadow="xs"
															style={{
																textAlign: "center",
																backgroundColor: color,
																borderRadius: 5,
																margin: "0.2rem",
																fontSize: "0.6rem",
															}}
														>
															{name}
														</Paper>
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
												}}
											>
												{allEvents
													.filter(({ date, time }) => {
														const date1 = moment(date, "YYYY-MM-DD");
														const date2 = moment(weekDate, "DD/MM/YYYY");
														return (
															date1.isSame(date2, "day") &&
															time === "Après-midi"
														);
													})
													.map(({ name, color }) => (
														<Paper
															padding="xs"
															shadow="xs"
															style={{
																textAlign: "center",
																backgroundColor: color,
																borderRadius: 5,
																margin: "0.2rem",
																fontSize: "0.6rem",
															}}
														>
															{name}
														</Paper>
													))}
											</Col>
										</>
									)}
								</>
							))}

							{openRooms[building] &&
								rooms.map(({ name, promotion }) => (
									<>
										<Col
											span={2}
											style={{
												borderBottom: "1px solid black",
												borderRight: "1px solid black",
												paddingLeft: "2rem",
											}}
										>
											{name}
										</Col>
										{weekDates.map((weekDate) => (
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
												>
													{promotion &&
														promotion.map(({ events }) =>
															events.map(({ name, date, time, color }) => {
																const date1 = moment(date, "YYYY-MM-DD");
																const date2 = moment(weekDate, "DD/MM/YYYY");
																return (
																	date1.isSame(date2, "day") &&
																	time === "Matin" && (
																		<Paper
																			padding="xs"
																			shadow="xs"
																			style={{
																				textAlign: "center",
																				backgroundColor: color,
																				borderRadius: 5,
																				margin: "0.2rem",
																				fontSize: "0.6rem",
																			}}
																		>
																			{name}
																		</Paper>
																	)
																);
															})
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
													}}
												>
													{promotion &&
														promotion.map(({ events }) =>
															events.map(({ name, date, time, color }) => {
																const date1 = moment(date, "YYYY-MM-DD");
																const date2 = moment(weekDate, "DD/MM/YYYY");
																return (
																	date1.isSame(date2, "day") &&
																	time === "Après-midi" && (
																		<Paper
																			padding="xs"
																			shadow="xs"
																			style={{
																				textAlign: "center",
																				backgroundColor: color,
																				borderRadius: 5,
																				margin: "0.2rem",
																				fontSize: "0.6rem",
																			}}
																		>
																			{name}
																		</Paper>
																	)
																);
															})
														)}
												</Col>
											</>
										))}
									</>
								))}
						</>
					))}

					{/* {viewMode === "week" && (
						<Grid
							gutter="xs"
							style={{
								borderTop: "1px solid black",
								borderLeft: "1px solid black",
							}}
						>
							{promotions.map(({ building, rooms }) => (
								<>
									{openRooms[building] &&
										rooms.map(({ name, promotion }) => (
											<>
												{weekDates.map((weekDate) => (
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
														>
															{promotion.map(({ events }) =>
																events.map(({ name, date, time, color }) => {
																	const date1 = new Date(
																		date
																	).toLocaleDateString();
																	//change weekDate to french format so d/m/y
																	const date2 = new Date(
																		weekDate.split("/").reverse().join("-")
																	).toLocaleDateString();
																	console.log(
																		date1 === date2 ? "true" : "false"
																	);
																	return (
																		date1 === date2 &&
																		time === "Matin" && (
																			<Paper
																				padding="xs"
																				shadow="xs"
																				style={{
																					textAlign: "center",
																					backgroundColor: color,
																					borderRadius: 0,
																					fontSize: "0.6rem",
																				}}
																			>
																				{name}
																			</Paper>
																		)
																	);
																})
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
															}}
														>
															{promotion.map(({ events }) =>
																events.map(
																	({ name, date, time, color }) =>
																		time === "Après-midi" && (
																			<Paper
																				padding="xs"
																				shadow="xs"
																				style={{
																					textAlign: "center",
																					backgroundColor: color,
																					borderRadius: 0,
																					fontSize: "0.6rem",
																				}}
																			>
																				{name}
																			</Paper>
																		)
																)
															)}
														</Col>
													</>
												))}
											</>
										))}
								</>
							))}
						</Grid>
					)} */}
				</Grid>
			)}
		</Paper>
	);
};

export default ScheduleTable;
