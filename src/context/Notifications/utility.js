// defaults
export const TYPE = "info";
export const CONTENT = "";
export const POSITION = "tc";
export const DURATION = 4000;

// error handling
export const getDefaultType = (type) => {
	if (type !== "success" && type !== "error" && type !== "warning" && type !== "info") {
		console.warn(`${type} is not a valid value for the 'type' argument, the default value of 'info' is applied.`);
		return TYPE;
	}
	return type;
};

export const getDefaultContent = (content) => {
	if (typeof content !== "string") {
		console.warn(
			`${content} is not a valid value for the 'content' argument, the default value of '' (empty string) is applied.`,
		);
		return CONTENT;
	}
	return content;
};

export const getDefaultPosition = (position) => {
	if (
		position !== "tl" &&
		position !== "tc" &&
		position !== "tr" &&
		position !== "c" &&
		position !== "bl" &&
		position !== "bc" &&
		position !== "br"
	) {
		console.warn(
			`${position} is not a valid value for the 'position' argument, the default value of 'tc' is applied.`,
		);
		return POSITION;
	}
	return position;
};

export const getDefaultDuration = (duration) => {
	if (+duration > 0 || duration === "infinite") {
		return duration;
	}
	console.warn(`${duration} is not a valid value for the 'duration' argument, the default value of 4000 is applied.`);
	return DURATION;
};
