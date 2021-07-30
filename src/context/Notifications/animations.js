export const getAppearAnimation = (element, duration) => {
	const height = `${element.offsetHeight}px`;
	const isInfinite = duration === "infinite";

	return isInfinite
		? {
				keyframes: {
					opacity: [0, 1],
					height: [0, height],
				},
				options: {
					duration: 100,
				},
		  }
		: {
				keyframes: {
					opacity: [0, 1, 1, 0],
					height: [0, height, height, 0],
					offset: [0, 100 / duration, 1 - 100 / duration, 1],
				},
				options: {
					duration,
				},
		  };
};

export const getRemoveAnimation = (element) => {
	const height = `${element.offsetHeight}px`;

	return {
		keyframes: {
			opacity: [1, 0],
			height: [height, 0],
			margin: 0,
		},
		options: {
			duration: 100,
		},
	};
};
