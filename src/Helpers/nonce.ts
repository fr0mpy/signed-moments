import { request } from './request';

export const getUserNonce = async (userWalletAddress: string) => {
	// TODO: type response
	const response = await request<{userWalletAddress: string}>({
		url: '',
		method: 'post',
		data: { userWalletAddress }
	});

	return response;
}



