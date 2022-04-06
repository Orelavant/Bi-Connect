import { useQuery } from "react-query";
import axios from "axios";

const url = "http://localhost:3001/graphql";
const query = `
    mutation loginAdmin($input: LoginInput!){
        login(input: $input)
    }
`;

const getLoginFn = (email: string, password: string) => {
	const login = async () => {
		const variables = {
			input: {
				email,
				password,
			},
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
	return login;
};

const staleTime = 8.64 * 10 ** 7;
const retry = 5;

export const useLogin = (email: string, password: string, enabled: boolean) => {
	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: `${url}-${email}-${password.length}`,
		queryFn: getLoginFn(email, password),
		enabled,
		staleTime,
		retry,
	});

	return { data, isLoading, isSuccess, isError };
};

export default useLogin;
