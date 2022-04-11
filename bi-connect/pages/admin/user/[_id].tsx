import React, { useEffect } from "react";
import UserInformation from "../../../components/UserInformation";
import {
	UpdateUserMutation,
	useGetUserCommentsQuery,
	useGetUserPostsQuery,
	useGetUserQuery,
} from "../../../generated/graphql";
import { useQueryClient } from "react-query";
import Tab from "../../../components/Tab";
import PostItem from "../../../components/PostItem";
import styles from "../../../styles/user-[_id]-Page.module.scss";

interface UsernameProps {
	_id: string;
}

const endpoint = "http://localhost:3001/graphql";

const Username = ({ _id }: UsernameProps) => {
	const queryClient = useQueryClient();
	const {
		data: userData,
		isLoading: userDataIsLoading,
		isError: userDataIsError,
		isSuccess: userDataIsSuccess,
		isRefetching: userDataIsRefetching,
		error: userDataError,
	} = useGetUserQuery(
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

	const {
		data: postData,
		isLoading: postDataIsLoading,
		isError: postDataIsError,
		isSuccess: postDataIsSuccess,
		isRefetching: postDataIsRefetching,
	} = useGetUserPostsQuery(
		{
			endpoint,
			fetchParams: {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		},
		{ input: { creatorName: userData?.getUser.username } },
		{
			queryKey: `user-${_id}-posts`,
			onSuccess: (data) => {
				queryClient.setQueryData(`user-${_id}`, data.getPosts);
			},
		}
	);

	const {
		data: commentData,
		isLoading: commentDataIsLoading,
		isError: commentDataIsError,
		isSuccess: commentDataIsSuccess,
		isRefetching: commentDataIsRefetching,
	} = useGetUserCommentsQuery(
		{
			endpoint,
			fetchParams: {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		},
		{ input: { creatorName: userData?.getUser.username } },
		{
			queryKey: `user-${_id}-comments`,
			onSuccess: (data) => {
				queryClient.setQueryData(`user-${_id}-comments`, data.getComments);
			},
		}
	);

	if (userDataIsError) {
		console.log(userDataError);
		return <div>Error finding user</div>;
	}
	if (userDataIsLoading) {
		return <div>Loading...</div>;
	}

	if (userDataIsSuccess) {
		// console.log(queryClient.getQueryData(`user-${_id}`));
		const { username, email, followedBoardsNames, verified, removed, admin } =
			(queryClient.getQueryData(`user-${_id}`) as any) || {};
		return (
			<div className={styles["container"]}>
				<Tab
					tabs={{
						User: {
							data: null,
							renderComponent: React.Fragment,
							createButtonDialog: <></>,
							noDataFallback: (
								<UserInformation
									_id={_id}
									username={username || userData.getUser.username}
									email={email || userData.getUser.email}
									followedBoardsNames={
										followedBoardsNames || userData.getUser.followedBoardsNames
									}
									verified={verified || userData.getUser.verified}
									removed={removed || userData.getUser.removed}
									admin={admin || userData.getUser.admin}
								/>
							),
						},
						Posts: {
							data: postDataIsSuccess ? postData.getPosts : null,
							renderComponent: PostItem,
							createButtonDialog: <></>,
						},
						Comments: {
							data: commentDataIsSuccess ? commentData.getComments : null,
							// fix this below
							renderComponent: PostItem,
							createButtonDialog: <></>,
						},
					}}
				/>
			</div>
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
