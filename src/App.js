import { useNotifications } from "./Notifications/NotificationsProvider";

function App() {
	const { notify } = useNotifications();

	return (
		<>
			<button
				onClick={() => {
					notify();
				}}>
				TOP LEFT
			</button>
			<button
				onClick={() => {
					notify("warning", "hello world, my name is Samy", "tr", "infinite");
				}}>
				TOP RIGHT
			</button>
			<button
				onClick={() => {
					notify(
						"info",
						"hello world, my name is Samy, I am a front end developer from saratov russia",
						"c",
						"infinite",
					);
				}}>
				CENTER
			</button>
			<button
				onClick={() => {
					notify("error", "hello world, my name is Samy", "bl", "infinite");
				}}>
				BOTTOM
			</button>
		</>
	);
}

export default App;
