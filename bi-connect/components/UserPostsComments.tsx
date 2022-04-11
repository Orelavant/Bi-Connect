import React from "react";
import { useGetUserPostsQuery } from "../generated/graphql";
import { useQueryClient } from "react-query";
import PostItem from "./PostItem";
import Tab from "../components/Tab";

interface UserPostsCommentsProps {
	_id: string;
	username: string;
}

const endpoint = "http://localhost:3001/graphql";

const UserPostsComments = ({ _id, username }: UserPostsCommentsProps) => {
	const queryClient = useQueryClient();
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
		{ input: { creatorName: username } },
		{
			queryKey: `user-${_id}-posts`,
			onSuccess: (data) => {
				queryClient.setQueryData(`user-${_id}`, data.getPosts);
			},
		}
	);

	return (
		<Tab
			tabs={{
				Posts: {
					data: postDataIsSuccess ? postData.getPosts : null,
					renderComponent: PostItem,
					createButtonDialog: <div></div>,
				},
				Posts2: {
					data: postDataIsSuccess ? postData.getPosts : null,
					renderComponent: PostItem,
					createButtonDialog: <div></div>,
				},
			}}
		/>
	);
};

export default UserPostsComments;
