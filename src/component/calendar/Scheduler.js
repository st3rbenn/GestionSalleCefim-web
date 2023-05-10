// Scheduler.js
import React from "react";
import { Grid, Col } from "@mantine/core";
import WeekView from "./WeekView";

const Scheduler = ({ date, promos }) => {
	return (
		<Grid gutter="md">
			{promos.map((promo, i) => (
				<Col span={12} key={i} style={{ marginBottom: "1em" }}>
					<WeekView date={date} promo={promo} />
				</Col>
			))}
		</Grid>
	);
};

export default Scheduler;
