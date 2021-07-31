/* eslint-disable default-case */
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ReactComponent as Close } from "../../assets/close.svg";
import { getAppearAnimation, getRemoveAnimation } from "./animations";
import styles from "./NotificationsProvider.module.css";
import {
	CALLBACK,
	CONTENT,
	DURATION,
	getDefaultCallBack,
	getDefaultContent,
	getDefaultDuration,
	getDefaultPosition,
	getDefaultType,
	POSITION,
	TYPE,
} from "./utility";

const Notification = (props) => {
	const { id, type, content, position, deleteNotification, duration, callBack } = props;
	const isInfinite = duration === "infinite";
	const [x, setX] = useState(0);
	const [deltaX, setDeltaX] = useState(0);
	const [currentAnimation, setCurrentAnimation] = useState(null);
	const notificationRef = useRef();

	useLayoutEffect(() => {
		const notification = notificationRef.current;
		const { keyframes, options } = getAppearAnimation(notification, duration);
		const animation = notification.animate(keyframes, options);
		animation.onfinish = () => {
			if (!isInfinite) {
				callBack && callBack();
				deleteNotification(id, position);
			}
		};
		setCurrentAnimation(animation);
	}, []);

	const closeNotification = () => {
		const notification = notificationRef.current;
		const { keyframes, options } = getRemoveAnimation(notification);
		notification.animate(keyframes, options).onfinish = () => {
			callBack && callBack();
			deleteNotification(id, position);
		};
	};

	const handleTouchStart = (e) => {
		!isInfinite && currentAnimation.pause();
		const initialX = e.touches[0].clientX;
		setX(initialX);
	};

	const handleTouchMove = (e) => {
		const newX = e.touches[0].clientX - x;
		setDeltaX(newX);
	};

	const handleTouchEnd = () => {
		if (Math.abs(deltaX) > 100) {
			closeNotification();
			return;
		}
		!isInfinite && currentAnimation.play();
		setX(0);
		setDeltaX(0);
	};

	return (
		<div
			style={{
				backgroundColor: `var(--${type})`,
				transform: `translateX(${deltaX}px)`,
			}}
			className={`${styles.Notification} ${styles[type]}`}
			onClick={closeNotification}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
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
	const containerRef = useRef();

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

	const resizeHandler = () => {
		containerRef.current.style.height = `${window.innerHeight}px`;
		const width = window.innerWidth;
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

	const notify = (type = TYPE, content = CONTENT, position = POSITION, duration = DURATION, callBack = CALLBACK) => {
		type = getDefaultType(type);
		content = getDefaultContent(content);
		position = getDefaultPosition(position);
		duration = getDefaultDuration(duration);
		callBack = getDefaultCallBack(callBack);

		const id = v4();
		const object = { id, type, content, position, deleteNotification, duration, callBack };
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
			<div className={styles.NotificationsContainer} ref={containerRef}>
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
