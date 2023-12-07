import {Web3} from "web3";

export const ethEnabled = () => window.ethereum;

export const ethRequest = async <T, >(method: {method: string}) => {
	const req = await window.ethereum.request(method)
	return (req as T);
}

export const requestAccount = async () => {
	const [account] = await ethRequest<Array<string>>({method: 'eth_requestAccounts'})

	return account;
}

export const setWeb3OnWindow = () => {
	if (ethEnabled()) window.web3 = new Web3(window.ethereum);
}

export const LaunchWallet = async () => {
	if (ethEnabled()) {
		const account = await requestAccount();
		console.log(account, 'here')
		setWeb3OnWindow();
		return true;
	}

	return;
};