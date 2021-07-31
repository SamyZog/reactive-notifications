/* eslint-disable default-case */
import { useNotifications } from "../../context/Notifications/NotificationsProvider";
import styles from "./Controller.module.css";

const success = [
	"You have successfully logged in",
	"Congratulations you are the 1 million visitor",
	"Action performed successfully",
	"Your ride will be here shortly",
	"Email sent",
];
const error = [
	"Email or password is invalid",
	"You do not have permission to perform this action",
	"Network error",
	"Something went wrong",
	"This page is no longer active",
];
const warning = [
	"You have 2 more attempts",
	"Your password is weak",
	"Email is already in use",
	"Your connection is slow",
	"Your free trial ends in 24 hours",
];
const info = [
	"You will be redirected shortly",
	"The temperature now is 27 degrees celsius",
	"Expect rain at 2PM",
	"Log in to view",
	"Name of artist: Jimi Hendrix",
];
const types = ["success", "error", "warning", "info"];
const positions = ["tl", "tc", "tr", "c", "bl", "bc", "br"];

const Controller = (props) => {
	const { notify, _clearAll } = useNotifications();

	const getRandomNum = (upto) => Math.floor(Math.random() * upto);

	const getRandomType = () => types[getRandomNum(types.length)];

	const getRandomtext = (text) => {
		if (text === "success") return success[getRandomNum(success.length)];
		if (text === "error") return error[getRandomNum(error.length)];
		if (text === "warning") return warning[getRandomNum(warning.length)];
		if (text === "info") return info[getRandomNum(info.length)];
	};

	const getRandomPosition = () => positions[getRandomNum(positions.length)];

	return (
		<main className={styles.Controller}>
			<section className={styles.demo}>
				<h1>
					<a href="https://github.com/SamyZog/reactive-notifications" target="_blank" rel="noreferrer">
						reactive-notifications
					</a>
				</h1>
				<div className={styles.info}>
					<p>
						This is a small notifications library that provides beautiful, simple and responsive
						notifications to any <code>React</code> app <code>v16.8.0</code> or above.
					</p>
					<div>
						<p>To remove a notification manually, simply click, swipe or tap on it.</p>
						<div className={styles.buttons}>
							<button onClick={_clearAll}>clear all</button>
						</div>
					</div>
					<div>
						<p>TYPES</p>
						<div className={styles.buttons}>
							<button
								onClick={() => {
									const content = getRandomtext("success");
									const position = getRandomPosition();
									notify("success", content, position);
								}}>
								success
							</button>
							<button
								onClick={() => {
									const content = getRandomtext("error");
									const position = getRandomPosition();
									notify("error", content, position);
								}}>
								error
							</button>
							<button
								onClick={() => {
									const content = getRandomtext("warning");
									const position = getRandomPosition();
									notify("warning", content, position);
								}}>
								warning
							</button>
							<button
								onClick={() => {
									const content = getRandomtext("info");
									const position = getRandomPosition();
									notify("info", content, position);
								}}>
								info
							</button>
						</div>
					</div>
					<div>
						<p>POSITION</p>
						<div className={styles.buttons}>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "tl");
								}}>
								top left
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "tc");
								}}>
								top center
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "tr");
								}}>
								top right
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									const log = () => {
										console.log("zabriye");
									};
									notify(type, content, "c");
								}}>
								center
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "bl");
								}}>
								bottom left
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "bc");
								}}>
								bottom center
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									notify(type, content, "br");
								}}>
								bottom right
							</button>
						</div>
					</div>
					<div>
						<p>DURATION</p>
						<div className={styles.buttons}>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									const position = getRandomPosition();
									notify(type, content, position, 2000);
								}}>
								2000
							</button>
							<button
								onClick={() => {
									const type = getRandomType();
									const content = getRandomtext(type);
									const position = getRandomPosition();
									notify(type, content, position, "infinite");
								}}>
								infinite
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Controller;
