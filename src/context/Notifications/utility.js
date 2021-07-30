// defaults
export const TYPE = "info";
export const CONTENT = "";
export const POSITION = "tc";
export const DURATION = 4000;
export const DURATION_MIDPOINT = 300;

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

export const typeError = (type) => {
	if (type !== "success" && type !== "error" && type !== "warning" && type !== "info") {
		throw new Error(
			`${type} is not a valid value for the 'type' argument, the default value of 'info' is applied.`,
		);
	}
};

export const contentError = (content) => {
	if (typeof content !== "string") {
		throw new Error(
			`${content} is not a valid value for the 'content' argument, the default value of '' (empty string) is applied.`,
		);
	}
};

export const positionError = (position) => {
	if (
		position !== "tl" &&
		position !== "tc" &&
		position !== "tr" &&
		position !== "c" &&
		position !== "bl" &&
		position !== "bc" &&
		position !== "br"
	) {
		throw new Error(
			`${position} is not a valid value for the 'position' argument, the default value of 'tc' is applied.`,
		);
	}
};

export const durationError = (duration) => {
	if (duration !== "infinite" && isNaN(duration)) {
		throw new Error(
			`${duration} is not a valid value for the 'duration' argument, the default value of 4000 is applied.`,
		);
	}
};
