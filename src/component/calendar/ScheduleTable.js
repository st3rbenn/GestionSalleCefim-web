import React, { useState } from "react";
import {
	Table,
	Button,
	Col,
	Grid,
	Paper,
	Flex,
	Text,
	Popover,
	Container,
	Card,
} from "@mantine/core";

const promotions = [
	{
		room: "Salle Arobase",
		promo: [
			{
				name: "Dev Web",
			},
			{
				name: "Design",
			},
		],
	},
	{
		room: "Salle Cookie",
		promo: [
			{
				name: "Dev Web",
			},
			{
				name: "Design",
			},
		],
	},
	{
		room: "Salle Hashtag",
		promo: [
			{
				name: "Dev Web",
			},
			{
				name: "Design",
			},
		],
	},
];

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
	const dayDates = getDayDates(currentWeek);
	const [viewMode, setViewMode] = useState("week");
	const rooms = Array.from(new Set(promotions.map((promo) => promo.room)));
	const promosByRoom = rooms.map((room) => ({
		room,
		promos: promotions.filter((promo) => promo.room === room),
	}));

	const [openRooms, setOpenRooms] = useState({});

	const previousWeek = () => {
		setCurrentWeek(currentWeek - 1);
	};

	const nextWeek = () => {
		setCurrentWeek(currentWeek + 1);
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
						onClick={() => setViewMode("day")}
						style={{
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							marginLeft: 7,
						}}
					>
						Day
					</Button>
					<Button
						onClick={() => setViewMode("week")}
						style={{
							borderRadius: 0,
						}}
					>
						Week
					</Button>
					<Button
						onClick={() => setViewMode("month")}
						style={{
							borderTopLeftRadius: 0,
							borderBottomLeftRadius: 0,
						}}
					>
						Month
					</Button>
				</Grid.Col>
			</Grid>

			{viewMode === "day" && (
				<Flex
					sx={{
						width: "100%", // make sure the container takes full width
						overflowX: "auto", // enables horizontal scrolling
						paddingLeft: 30,
						paddingBottom: 30,
					}}
				>
					<Table
						style={{ border: "1px solid black", borderCollapse: "collapse" }}
					>
						<thead>
							<tr>
								<th style={{ border: "1px solid black" }}></th>
								<th
									colSpan="11"
									style={{ border: "1px solid black", textAlign: "center" }}
								>
									{dayDates}
								</th>
							</tr>
							<tr>
								<th style={{ border: "1px solid black" }}></th>
								{Array.from({ length: 10 }, (_, i) => i + 8).map((hour) => (
									<th
										key={hour}
										style={{
											border: "1px solid black",
											textAlign: "center",
											width: "10%",
											fontSize: "0.6rem",
											padding: 0,
										}}
									>
										{hour}:00 - {hour + 1}:00
									</th>
								))}
							</tr>
						</thead>
						<tbody
							style={{
								overflow: "scroll",
							}}
						>
							{promosByRoom.map(({ room, promos }) => (
								<>
									<tr
										onClick={() =>
											setOpenRooms((prev) => ({ ...prev, [room]: !prev[room] }))
										}
									>
										<td
											style={{ border: "1px solid black", cursor: "pointer" }}
										>
											{room}
										</td>
										{weekDates.map(() => (
											<>
												<td
													style={{
														border: "1px solid black",
														width: "10rem",
														height: "5rem",
													}}
												></td>
												<td
													style={{
														border: "1px solid black",
														width: "10rem",
														height: "5rem",
													}}
												></td>
											</>
										))}
									</tr>
									{openRooms[room] &&
										promos.map((promo) => (
											<tr key={promo.name}>
												<td style={{ border: "1px solid black" }}>
													{promo.name}
												</td>
												{weekDates.map(() => (
													<>
														<td
															style={{
																border: "1px solid black",
																width: "10rem",
																height: "5rem",
															}}
														></td>
														<td
															style={{
																border: "1px solid black",
																width: "10rem",
																height: "5rem",
															}}
														></td>
													</>
												))}
											</tr>
										))}
								</>
							))}
						</tbody>
					</Table>
				</Flex>
			)}

			{viewMode === "week" && (
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
					></Col>
					{weekDates.map((date, index) => (
						<Col
							span={2}
							key={index}
							style={{
								borderBottom: "1px solid black",
								borderRight: "1px solid black",
								textAlign: "center",
							}}
						>
							{date}
						</Col>
					))}

					<Col
						span={2}
						style={{
							borderBottom: "1px solid black",
							borderRight: "1px solid black",
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
								}}
							>
								Après-midi
							</Col>
						</>
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
									setOpenRooms((prev) => ({
										...prev,
										[room]: !prev[room],
									}))
								}
							>
								{room}
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
									></Col>
									<Col
										span={1}
										style={{
											borderBottom: "1px solid black",
											borderRight: "1px solid black",
											width: "10rem",
											height: "5rem",
										}}
									></Col>
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
											{name}
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
												></Col>
												<Col
													span={1}
													style={{
														borderBottom: "1px solid black",
														borderRight: "1px solid black",
														width: "10rem",
														height: "5rem",
													}}
												></Col>
											</>
										))}
									</>
								))}
						</>
					))}
				</Grid>
			)}

			{/* {viewMode === "month" && (
				<div>
					<h1>Month</h1>
				</div>
			)} */}
		</Paper>
	);
};

export default ScheduleTable;
