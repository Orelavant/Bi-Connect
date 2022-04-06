import { useQuery } from "react-query";
import axios from "axios";

const url = "http://localhost:3001/graphql";
const query = `
query getBoards($input: GetBoardsInput!) {
    getBoards(input: $input) {
        name
        description
    }
}
`;

const getBoardsFn = (input: any) => {
	const getBoards = async () => {
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
	return getBoards;
};

const staleTime = 8.64 * 10 ** 7;
const retry = 5;

export const useGetBoards = (input: any) => {
	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: `${url}-${JSON.stringify(input)}-Boards`,
		queryFn: getBoardsFn(input),
		enabled: true,
		staleTime,
		retry,
	});
	return { data, isLoading, isSuccess, isError };
};

export default useGetBoards;
