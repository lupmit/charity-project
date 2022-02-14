export const CHARITY_CONTRACT_ADDRESS =
	"0x4101A67C9D47B8e86E658F403ABc5D94dF373AF5";

const isDEV = false;

export const BASE_SERVER_URL = "/api";

export const BASE_PROVIDER_URL = isDEV
	? "http://localhost:7545"
	: "https://kovan.infura.io/v3/0ce6e20f5ef04fe182c23c081d988254";

export const NETWORK_ID = isDEV ? 5777 : 42;
