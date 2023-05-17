import { Button, Grid } from "@mantine/core";
import React from "react";

function SchedulerHeader({handleSwitchView, previousWeek, nextWeek}) {
	return (
		<Grid
			style={{
				display: "flex",
				justifyContent: "space-between",
				marginBottom: 30,
				paddingTop: 30,
				paddingLeft: 15,
				paddingRight: 15,
			}}
		>
			<Grid.Col
				span={6}
				sx={{
					padding: 0,
				}}
			>
				<Button
					onClick={previousWeek}
					style={{
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
					}}
				>
					&lt;
				</Button>
				<Button
					onClick={nextWeek}
					sx={{
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
				sx={{
					justifyContent: "right",
					padding: 0,
				}}
			>
				<Button
					onClick={() => handleSwitchView("day")}
					style={{
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
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
				<Button
					onClick={() => handleSwitchView("month")}
					style={{
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
					}}
				>
					Month
				</Button>
			</Grid.Col>
		</Grid>
	);
}

export default SchedulerHeader;
