import { useQuery } from "react-query";
import axios from "axios";

const url = "http://localhost:3001/graphql";
const query = `
query getUsers($input: GetUsersInput!) {
    getUsers(input: $input) {
        username
        email
    }
}
`;

const getUsersFn = (input: any) => {
	const getUsers = async () => {
		const variables = {
			input,
		};
		const body = {
			query,
			variables,
		};
		try {
			const { data } = await axios.post(url, body);
			return data;
		} catch (err) {
			return err;
		}
	};
	return getUsers;
};

const staleTime = 8.64 * 10 ** 7;
const retry = 5;

export const useGetUsers = (input: any) => {
	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: `${url}-${JSON.stringify(input)}-Users`,
		queryFn: getUsersFn(input),
		enabled: true,
		staleTime,
		retry,
	});
	return { data, isLoading, isSuccess, isError };
};

export default useGetUsers;
