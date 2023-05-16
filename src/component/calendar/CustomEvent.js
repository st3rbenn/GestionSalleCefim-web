import { Paper, Tooltip } from "@mantine/core";
import React from "react";

function CustomEvent({ name, color, onClickEvent, data }) {
	return (
		<Tooltip
			label={name}
			withArrow
			color={color}
			transitionProps={{ transition: "pop", duration: 300 }}
      openDelay={300}
      sx={{
        fontSize: "0.6rem",
      }}
		>
			<Paper
				padding="xs"
				shadow="xs"
				style={{
					textAlign: "center",
					backgroundColor: color,
					borderRadius: 5,
					paddingLeft: "0.3rem",
					margin: "0.2rem",
					fontSize: "0.6rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					overflow: "hidden",
					width: "100px",
					display: "-webkit-box",
					bkitLineClamp: 3,
					WebkitBoxOrient: "vertical",
          cursor: "pointer",
				}}
        onClick={() => onClickEvent(data)}
			>
				{name}
			</Paper>
		</Tooltip>
	);
}

export default CustomEvent;
