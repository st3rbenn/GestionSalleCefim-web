// App.js
import React, { useEffect } from "react";
import { Flex } from "@mantine/core";
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
		<Flex>
			<Scheduler />
		</Flex>
	);
}

export default App;
