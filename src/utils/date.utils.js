export function getWeekDates(weekOffset) {
	const dates = [];
	let today = new Date();
	const offsetDays = weekOffset * 7;
	today.setDate(today.getDate() + offsetDays);
	let dayOfWeek = today.getDay(); // 0 (dimanche) - 6 (samedi)
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // Adjust Sunday to be 7 instead of 0

	for (let i = 0; i < 5; i++) {
		// 5 jours de la semaine (Lundi - Vendredi)
		const date = new Date();
		date.setDate(today.getDate() - dayOfWeek + i + 1); // Start from Monday
		dates.push(date.toLocaleDateString("fr-FR"));
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