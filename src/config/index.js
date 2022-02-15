const isProduction = true;

export const BASE_SERVER_URL = "/api";

export const BASE_PROVIDER_URL = isProduction
	? "https://kovan.infura.io/v3/0ce6e20f5ef04fe182c23c081d988254"
	: "http://localhost:7545";

export const NETWORK_ID = isProduction ? 42 : 5777;
