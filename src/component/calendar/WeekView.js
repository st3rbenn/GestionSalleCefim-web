// WeekView.js
import React from "react";
import { Grid, Col } from "@mantine/core";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import DayCell from "./DayCell";

const WeekView = ({ date, promo }) => {
	const start = startOfWeek(date, { weekStartsOn: 1 }); // La semaine commence le lundi
	const end = endOfWeek(date, { weekStartsOn: 1 }); // La semaine commence le lundi
	const daysOfWeek = eachDayOfInterval({ start, end });
	daysOfWeek.pop();
	daysOfWeek.shift();

	return (
		<Grid
			style={{
				overflowY: "scroll",
        flexWrap: "nowrap",
			}}
		>
			{daysOfWeek.map((date, i) => (
				<Col
					span={3}
					key={i}
					style={{
						marginBottom: "1em",
						borderWidth: 1,
						borderColor: "#ddd",
						borderStyle: "solid",
						borderRadius: 4,
						height: "100vh",
					}}
				>
					<DayCell day={format(date, "dd/MM/yyyy")} promo={promo} />
				</Col>
			))}
		</Grid>
	);
};

export default WeekView;
