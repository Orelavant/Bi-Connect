import React, { useEffect } from "react";
import UserInformation from "../../../components/UserInformation";
import {
	UpdateUserMutation,
	useGetUserQuery,
} from "../../../generated/graphql";
import { useQueryClient } from "react-query";

interface UsernameProps {
	_id: string;
}

const endpoint = "http://localhost:3001/graphql";

const Username = ({ _id }: UsernameProps) => {
	const queryClient = useQueryClient();
	const { data, isLoading, isError, isSuccess, isRefetching, error } =
		useGetUserQuery(
			{
				endpoint,
				fetchParams: {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				},
			},
			{ input: { _id } },
			{
				queryKey: `user-${_id}`,
				onSuccess: (data) => {
					queryClient.setQueryData(`user-${_id}`, data.getUser);
				},
			}
		);

	if (isError) {
		console.log(error);
		return <div>Error finding user</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isSuccess) {
		// console.log(queryClient.getQueryData(`user-${_id}`));
		const { username, email, followedBoardsNames, verified, removed, admin } =
			(queryClient.getQueryData(`user-${_id}`) as any) || {};
		return (
			<UserInformation
				_id={_id}
				username={username || data.getUser.username}
				email={email || data.getUser.email}
				followedBoardsNames={
					followedBoardsNames || data.getUser.followedBoardsNames
				}
				verified={verified || data.getUser.verified}
				removed={removed || data.getUser.removed}
				admin={admin || data.getUser.admin}
			/>
		);
	}

	// not possible ot be here (most of the time)
	return <div>Impossible</div>;
};

export async function getServerSideProps({ query }: any) {
	const { _id } = query;
	return { props: { _id } };
}

export default Username;
