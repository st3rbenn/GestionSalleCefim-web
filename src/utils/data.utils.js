export const promotions = [
	{
		building: "CEFIM",
		rooms: [
			{
				name: "Salle Cookie",
				promotion: [
					{
						name: "CDA",
						events: [
							{
								id: 1,
								name: "Cours CDA S.Cookie",
								date: "2023-05-18",
								time: "Après-midi",
								color: "red",
							},
						],
					},
				],
			},
			{
				name: "Salle Hashtag",
				promotion: [
					{
						name: "Dev Web",
						events: [
							{
								id: 1,
								name: "Cour Dev Web S.Hashtag",
								date: "2023-05-15",
								time: "Après-midi",
								color: "blue",
							},
							{
								id: 2,
								name: "Cour Dev Web S.Hashtag",
								date: "2023-05-15",
								time: "Matin",
								color: "cyan",
							},
						],
					},
				],
			},
		],
	},
	{
		building: "MAME",
		rooms: [
			{
				name: "Salle Roberta Williams",
				promotion: [
					{
						name: "Design",
						events: [
							{
								id: 1,
								name: "Cour Design S.Roberta Williams",
								date: "2023-05-22",
								time: "Matin",
							},
							{
								id: 2,
								name: "Cour Design S.Roberta Williams",
								date: "2023-05-22",
								time: "Après-midi",
							},
							// d'autres événements
						],
					},
					{
						name: "CDA",
						events: [
							{
								id: 1,
								name: "Cour CDA S.Roberta Williams",
								date: "2023-05-22",
								time: "Matin",
							},
						],
					},
				],
			},
		],
	},
];
