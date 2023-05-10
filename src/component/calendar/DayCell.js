// DayCell.js
import React from "react";
import { Paper, Text, Divider, Col, Box } from "@mantine/core";

const DayCell = ({ day, promo }) => {
	return (
		<Paper
			padding="md"
			style={{ height: "100%", display: "flex", flexDirection: "column" }}
		>
			<Text variant="h6" align="center">
				{day}
			</Text>
			<Divider variant="dashed" margins="md" />
			<Col style={{ display: "flex", flexDirection: "row", flex: 1 }}>
				<Box
					align="center"
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						borderWidth: 1,
						borderColor: "#ddd",
						borderStyle: "solid",
					}}
				>
					<Text align="center">{promo} Matin</Text>
				</Box>
				<Box
					align="center"
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						borderWidth: 1,
						borderColor: "#ddd",
						borderStyle: "solid",
					}}
				>
					<Text align="center">{promo} Après-midi</Text>
				</Box>
			</Col>
		</Paper>
	);
};

export default DayCell;
