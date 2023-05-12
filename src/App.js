// App.js
import React from "react";
import ScheduleTable from "./component/calendar/ScheduleTable";
import { Flex } from "@mantine/core";

function App() {
	const date = new Date(); // La date à partir de laquelle afficher la semaine
	const promos = ["CDA", "Dev Web", "Design", "Marketing"]; // Remplacez par vos promotions

	return (
		<Flex>
			<ScheduleTable />
		</Flex>
	);
}

export default App;
