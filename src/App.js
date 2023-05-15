import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import { NavbarMinimal } from "./view/Dashboard";
import Reservations from "./view/Reservations";
import Rooms from "./view/Rooms";
import Trainers from "./view/Trainers";
import { Box, Flex } from "@mantine/core";
import { useAppThunkDispatch } from "./store";
import { editUser, getAllCampuses, getAllUser } from "./store/mainslice";
import Scheduler from "./component/calendar/ScheduleTable";
import { useSelector } from "react-redux";

function App() {
	const date = new Date(); // La date à partir de laquelle afficher la semaine
	const promos = ["CDA", "Dev Web", "Design", "Marketing"]; // Remplacez par vos promotions

	/* DEBUT DU CODE */

	/* voir aussi src/store et src/services */

	//UTILISATION DE REDUX POUR RECUPERER LES DONNEES DE LA BDD

	const dispatch = useAppThunkDispatch();
	const allUsers = useSelector((state) => state.users);

	const fetchUser = async () => {
		const response = await dispatch(getAllUser());

		if (response.meta.requestStatus === "fulfilled") {
			console.log(allUsers);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	/* FIN DU CODE */

	return (
		<Box style={{
			display: "flex",
			margin: "10px",
		}}>
			<NavbarMinimal />
			<Routes>
				<Route path="/" element={<Scheduler />} index />
				<Route path="/admin/formateurs" element={<Trainers />} />
				<Route path="/admin/reservations" element={<Reservations />} />
				<Route path="/admin/salles" element={<Rooms />} />
			</Routes>
		</Box>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));


export default App;
