// App.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import { NavbarMinimal } from "./view/Dashboard";
import Reservations from "./view/Reservations";
import Rooms from "./view/Rooms";
import Trainers from "./view/Trainers";
import { Box, Flex } from "@mantine/core";

function App() {
	const date = new Date(); // La date à partir de laquelle afficher la semaine
	const promos = ["CDA", "Dev Web", "Design", "Marketing"]; // Remplacez par vos promotions

	return (
		<Box style={{
			display: "flex",
			margin: "10px",
		}}>
			<NavbarMinimal />
			<Routes>
				<Route path="/" element={< Flex> Home</Flex>} index />
				<Route path="/formateurs" element={<Trainers />} />
				<Route path="/reservations" element={<Reservations />} />
				<Route path="/salles" element={<Rooms />} />
			</Routes>
		</Box>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));


export default App;
