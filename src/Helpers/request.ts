import axios from 'axios';

type RequestMethod = 'put' | 'get' |'post' | 'patch' | 'delete';

interface IRequestOptions<D> {
	url: string;
	data: D;
	method: RequestMethod
}

// TODO: type response

export const request = async <D extends {}>({url, method, data}: IRequestOptions<D>) => {
	return await axios({
		method,
		url,
		data: {
		  ...data
		},
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	    .then((res) => {
		  const data = JSON.parse(res.data.body);
		  return data;
		})
		.catch(e => console.log(e))

		
};