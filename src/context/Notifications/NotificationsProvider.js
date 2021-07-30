/* eslint-disable default-case */
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as Close } from "../../assets/close.svg";
import styles from "./NotificationsProvider.module.css";
import {
	contentError,
	durationError,
	getAutoAnimation,
	getCssValues,
	getLeaveAnimation,
	getManualAnimation,
	positionError,
	typeError,
} from "./utility";

const Notification = (props) => {
	const { id, type, content, position, deleteNotification, duration } = props;
	const notificationRef = useRef();

	useLayoutEffect(() => {
		const isInfinite = duration === "infinite";
		const notificationDiv = notificationRef.current;
		const [height, margin] = getCssValues(notificationDiv, "height", "margin");
		if (isInfinite) {
			const { keyframes, options } = getManualAnimation(height, margin);
			notificationDiv.animate(keyframes, options);
		} else {
			const { keyframes, options } = getAutoAnimation(duration, height, margin);
			notificationDiv.animate(keyframes, options).onfinish = () => deleteNotification(id, position);
		}
	}, []);

	const closeNotification = () => {
		const notificationDiv = notificationRef.current;
		const [height, margin] = getCssValues(notificationDiv, "height", "margin");
		const { keyframes, options } = getLeaveAnimation(height, margin, duration);
		notificationDiv.animate(keyframes, options).onfinish = () => deleteNotification(id, position);
	};

	return (
		<div
			style={{ backgroundColor: `var(--${type})` }}
			className={`${styles.Notification} ${styles[type]}`}
			onClick={closeNotification}
			ref={notificationRef}>
			<div className={styles.wrapper}>
				{type !== "info" ? <h1 className={styles.title}>{type}</h1> : null}
				<p className={styles.content}>{content}</p>
			</div>
			<div className={styles.iconWrapper}>
				<Close />
			</div>
		</div>
	);
};

const notificationsContext = createContext();
const { Provider: Notifications } = notificationsContext;

const NotificationsProvider = (props) => {
	const [isMobile, setIsMobile] = useState(false);
	const [notifications, setNotifications] = useState({
		tl: [],
		tc: [],
		tr: [],
		c: [],
		bl: [],
		bc: [],
		br: [],
		mtc: [],
		mc: [],
		mbc: [],
	});

	const _clearAll = () => {
		setNotifications({ tl: [], tc: [], tr: [], c: [], bl: [], bc: [], br: [], mtc: [], mc: [], mbc: [] });
	};

	const getMobileArrayId = (position) => {
		if (position[0] === "t") return "mtc";
		if (position[0] === "c") return "mc";
		if (position[0] === "b") return "mbc";
	};

	const resizeHandler = (e) => {
		const width = e.target.innerWidth;
		setIsMobile(width < 850);
	};

	useEffect(() => {
		window.addEventListener("resize", resizeHandler);
		return () => window.removeEventListener("resize", resizeHandler);
	}, []);

	const deleteNotification = (notificationId, position) => {
		const mobileArrayId = getMobileArrayId(position);
		setNotifications((state) => {
			return {
				...state,
				[position]: state[position].filter(({ id }) => id !== notificationId),
				[mobileArrayId]: state[mobileArrayId].filter(({ id }) => id !== notificationId),
			};
		});
	};

	const notify = (type = "info", content = "", position = "tc", duration = 4000) => {
		try {
			typeError(type);
		} catch (error) {
			console.warn(error);
			type = "info";
		}
		try {
			contentError(content);
		} catch (error) {
			console.warn(error);
			content = "";
		}
		try {
			positionError(position);
		} catch (error) {
			console.warn(error);
			position = "tc";
		}
		try {
			durationError(duration);
		} catch (error) {
			console.warn(error);
			duration = 4000;
		}

		const id = v4();
		const object = { id, type, content, position, deleteNotification, duration };
		const mobileArrayId = getMobileArrayId(position);

		setNotifications((state) => {
			const array = [...state[position]];
			const mobileArray = [...state[mobileArrayId]];
			array.push(object);
			mobileArray.push(object);
			return { ...state, [position]: array, [mobileArrayId]: mobileArray };
		});
	};

	const value = {
		notify,
		_clearAll,
	};

	return (
		<Notifications value={value}>
			<div className={styles.NotificationsContainer}>
				{window.innerWidth < 850 || isMobile ? (
					<>
						<div key="mtc" className={styles.mobileTop}>
							{notifications.mtc.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div key="mc" className={styles.mobileCentered}>
							{notifications.mc.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div key="mbc" className={styles.mobileBottom}>
							{notifications.mbc.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
					</>
				) : (
					<>
						<div className={`${styles.top} ${styles.left}`}>
							{notifications.tl.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={`${styles.top} ${styles.center}`}>
							{notifications.tc.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={`${styles.top} ${styles.right}`}>
							{notifications.tr.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={styles.centered}>
							{notifications.c.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={`${styles.bottom} ${styles.left}`}>
							{notifications.bl.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={`${styles.bottom} ${styles.center}`}>
							{notifications.bc.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
						<div className={`${styles.bottom} ${styles.right}`}>
							{notifications.br.map(({ id, ...rest }) => (
								<Notification key={id} id={id} {...rest} />
							))}
						</div>
					</>
				)}
			</div>
			{props.children}
		</Notifications>
	);
};

const useNotifications = () => useContext(notificationsContext);

export { useNotifications };
export default NotificationsProvider;
