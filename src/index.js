import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NotificationsProvider from "./context/Notifications/NotificationsProvider";
import "./styles.css";

ReactDOM.render(
	<React.StrictMode>
		<NotificationsProvider>
			<App />
		</NotificationsProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
