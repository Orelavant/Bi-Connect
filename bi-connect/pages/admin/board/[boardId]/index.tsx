import React from "react";
import { Item, Image } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import Post from "../../../../components/Post";
import styles from "../../../../styles/PostComment.module.scss";
import postStyles from "../../../../styles/Post.module.scss";
import { useGetPostsQuery } from "../../../../generated/graphql";
import CreatePostDialog from "../../../../components/CreatePostDialog";

const endpoint = "http://localhost:3001/graphql";

const Board = ({ bid }: any) => {
	// Get information to display posts
	console.log(bid);
	const {
		isLoading: postIsLoading,
		error: postError,
		isError: postIsError,
		isSuccess: postIsSuccess,
		data: postData,
	} = useGetPostsQuery(
		{
			endpoint,
			fetchParams: {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		},
		{
			input: {
				boardNameContains: bid,
			},
		}
	);

	// Structure of the page
	// TODO: IF EMPTY, PUT DOWN A MESSAGE SAYING THAT THIS BOARD IS EMPTY
	return (
		<Item.Group>
			<div>
				<h1>Board Title: {bid}</h1>
				<h3>Board Desc: "test description"</h3>
			</div>
			{postData?.getPosts.map((post, i) => (
				<Post
					boardName={postData?.getPosts[i].boardName}
					id={postData?.getPosts[i]._id}
					title={postData?.getPosts[i].title || ""}
					content={postData?.getPosts[i].content}
					user={postData?.getPosts[i].creatorName || ""}
				></Post>
			))}

			<CreatePostDialog boardName={bid}></CreatePostDialog>
		</Item.Group>
	);
};

// Get boardID from query parameter
export async function getServerSideProps({ query }: any) {
	const bid = query.boardId;
	return { props: { bid: bid } };
}

export default Board;
