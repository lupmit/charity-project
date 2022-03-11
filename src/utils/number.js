export const roundNumber = (num) => {
	return +(Math.round(num + "e+4") + "e-4");
};
