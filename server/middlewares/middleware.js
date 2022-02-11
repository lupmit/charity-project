const Web3Token = require("web3-token");

const ADMIN_ADDRESS = "0xba805627fa052727368f91cccb7ca0fda1774510";

module.exports = async (req, res, next) => {
	let token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ message: "missing token" });
	}
	token = token.split(" ")[1];
	const { address, body } = await Web3Token.verify(token);
	if (address !== ADMIN_ADDRESS) {
		return res.status(401).json({ message: "not permission" });
	}
	next();
};
