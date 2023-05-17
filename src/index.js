import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
			  <DndProvider backend={HTML5Backend}>
				  <Provider store={store}>
					  <App />
				  </Provider>
			  </DndProvider>
      </BrowserRouter>
		</MantineProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
