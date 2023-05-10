// App.js
import React from "react";
import { Grid, Col, Box } from "@mantine/core";
import WeekView from "./component/calendar/WeekView";
import PromoList from "./component/calendar/PromoList";
import Scheduler from "./component/calendar/Scheduler";

function App() {
	const date = new Date();

	return (
		<Box>
      <Scheduler date={date} promos={["CDA", "Dev Web", "Design", "Marketing"]} />
		</Box>
	);
}

export default App;
