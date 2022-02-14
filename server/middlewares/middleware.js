const Web3Token = require("web3-token");

const ADMIN_ADDRESS = "0xBA3B71fFBb153cc3Ef28F111F8533f370B3Eb871";

module.exports = async (req, res, next) => {
	let token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ message: "missing token" });
	}
	token = token.split(" ")[1];
	try {
		const { address, body } = await Web3Token.verify(token);
		if (address.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
			return res.status(401).json({ message: "not permission" });
		}
	} catch (err) {
		console.log(err);
		return res.status(401).json({ message: "token expired" });
	}
	next();
};
