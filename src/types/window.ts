import type {MetaMaskProvider} from "web3";
declare global {
    interface Window { 
		ethereum: MetaMaskProvider<any>;
		web3: any;
	}
}

export {}
