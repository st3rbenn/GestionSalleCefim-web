import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import Scheduler from "./component/calendar/ScheduleTable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<DndProvider backend={HTML5Backend}>
				<Scheduler />
			</DndProvider>
		</MantineProvider>
	</React.StrictMode>
);
