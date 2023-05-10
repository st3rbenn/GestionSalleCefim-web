// PromoList.js
import React from "react";
import { Box, Paper, Text } from "@mantine/core";

const promos = ["CDA", "Dev Web", "Design", "Marketing"]; // Remplacez par vos promotions

const PromoList = () => {
	return (
		<Box style={{
      height: "100%",
      marginTop: "6em",
    }}>
			{promos.map((promo, i) => (
				<Paper padding="md" style={{ marginBottom: "2.5em" }} key={i}>
					<Text align="center">Promo {promo}</Text>
				</Paper>
			))}
		</Box>
	);
};

export default PromoList;
