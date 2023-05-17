export function transformApiData(apiData) {
	return {
		building: apiData.name,
		rooms: apiData.building.flatMap((buildingData) =>
			buildingData.rooms.map((roomData) => ({
				name: roomData.name,
				promotion: roomData.reservations.map((reservationData) => ({
					name: reservationData.course.name,
					events: [
						{
							id: reservationData.id,
							name: reservationData.title,
							date: reservationData.startDate,
							time: getTimePeriod(reservationData.startHour),
							color: getColor(reservationData.course.name),
							hour: formatHour(reservationData.startHour),
						},
					],
				})),
			}))
		),
	};
}

function getTimePeriod(hour) {
	const [hours, minutes, seconds] = hour.split(":").map(Number);
	if (hours < 12) {
		return "Matin";
	} else {
		return "Après-midi";
	}
}

function getColor(courseName) {
	// À définir : logique pour attribuer une couleur en fonction du nom du cours
	// Exemple :
	if (courseName === "Analyse de Données") {
		return "red";
	} else {
		return "blue";
	}
}

function formatHour(hour) {
	return hour.slice(0, 5).replace(":", "h");
}
