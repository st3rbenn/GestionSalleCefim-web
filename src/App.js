import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, } from "react-router-dom";
import { NavbarMinimal } from "./view/Dashboard";
import Reservations from "./view/Reservations";
import Rooms from "./view/Rooms";
import Trainers from "./view/Users";
import Courses from "./view/Courses";
import { Box } from "@mantine/core";
import Scheduler from "./component/calendar/ScheduleTable";

function App() {
	const date = new Date(); // La date à partir de laquelle afficher la semaine
	const promos = ["CDA", "Dev Web", "Design", "Marketing"]; // Remplacez par vos promotions
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
				<Route path="/admin/formateurs" element={<Trainers />} />
				<Route path="/admin/reservations" element={<Reservations />} />
				<Route path="/admin/salles" element={<Rooms />} />
				<Route path="/admin/formations" element={<Courses />} />
			</Routes>
		</Box>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

export default App;
