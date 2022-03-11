export const shortAddress = (address) => {
	let head = address.substr(0, 6);
	let tail = address.substr(-4, 4);
	return head + "..." + tail;
};
