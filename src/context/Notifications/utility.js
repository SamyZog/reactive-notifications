// defaults
export const ORDER = "top";
export const POSITION = "c";
export const DURATION = 4000;
export const MINIMUM_DURATION = 2000;
export const DURATION_MIDPOINT = 300;
export const SUCCESS = "success";
export const ERROR = "error";
export const WARNING = "warning";
export const INFO = "info";

export const getManualAnimation = (...cssValues) => {
	const [height, margin] = cssValues;

	return {
		keyframes: {
			opacity: [0, 1],
			height: [0, height],
			margin: [0, margin],
		},
		options: {
			duration: DURATION_MIDPOINT,
			fill: "forwards",
		},
	};
};

export const getCssValues = (element, ...cssValues) =>
	cssValues.map((value) => window.getComputedStyle(element).getPropertyValue(value));

export const getAutoAnimation = (duration, ...cssValues) => {
	const [height, margin] = cssValues;

	const restStateDuration = duration - DURATION_MIDPOINT * 2;
	const spread = Math.floor(restStateDuration / DURATION_MIDPOINT);

	const getSpreadArray = (cssValue) => Array(spread).fill(cssValue);

	return {
		keyframes: {
			opacity: [0, ...getSpreadArray(1), 0],
			height: [0, ...getSpreadArray(height), 0],
			margin: [0, ...getSpreadArray(margin), 0],
		},
		options: {
			duration,
		},
	};
};

export const getLeaveAnimation = (...cssValues) => {
	const [height, margin] = cssValues;

	return {
		keyframes: {
			opacity: [1, 0],
			height: [height, 0],
			margin: [margin, 0],
		},
		options: {
			duration: DURATION_MIDPOINT,
		},
	};
};
