import moment from "moment";

export function getWeekDates(weekOffset) {
	const dates = [];
	let startOfWeek = moment().startOf("week").add(1, "days"); // Le début de la semaine est fixé à lundi.
	startOfWeek.add(weekOffset, "weeks"); // Ajout de l'offset de la semaine.

	for (let i = 0; i < 5; i++) {
		dates.push(startOfWeek.clone().add(i, "days").format("DD/MM/YYYY"));
	}

	return dates;
}

export function getDayDates(dayOffset) {
	//affiche juste la date d'aujourd'hui
	const today = new Date();
	const date = new Date();
	date.setDate(today.getDate() + dayOffset);
	return date.toLocaleDateString("fr-FR");
}
