import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

// export const injected = new NetworkConnector({
// 	urls: { 3: "https://ropsten.infura.io/v3/0ce6e20f5ef04fe182c23c081d988254" },
// 	defaultChainId: 1,
// });
