import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { NavbarMinimal } from "./view/Dashboard";
import Reservations from "./view/Reservations";
import Rooms from "./view/Rooms";
import Trainers from "./view/Trainers";
import { Box } from "@mantine/core";
import Scheduler from "./component/calendar/SchedulerCalendar";

function App() {
	return (
		<Box
			style={{
				display: "flex",
				margin: "10px",
			}}
		>
			<NavbarMinimal />
			<Routes>
				<Route path="/" element={<Scheduler />} index />
				<Route path="/admin">
					<Route path="/admin/formateurs" element={<Trainers />} index/>
					<Route path="/admin/reservations" element={<Reservations />} />
					<Route path="/admin/salles" element={<Rooms />} />
				</Route>
			</Routes>
		</Box>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

export default App;
