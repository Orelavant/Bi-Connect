import React from "react";
import { Item, Image } from "semantic-ui-react";
import "fomantic-ui-css/semantic.css";
import Post from "../../../components/Post";
import CreateButton from "../../../components/CreateButton";
import { useGetPostsQuery } from "../../../generated/graphql";

const endpoint = "http://localhost:3001/graphql";

const Board = ({ test }: any) => {
	// Get information to display posts
	console.log(test);
	const boardInfo = getBoardInfo(test);
	const {
		data: postData,
		isLoading: postIsLoading,
		isError: postIsError,
		isSuccess: postIsSuccess,
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
		{ input: {} }
	);
	// useGetBoards({});

	// Structure of the page
	// TODO: INSERT POST DATA FROM DATABASE
  	return (
		<Item.Group>
			<div>
				<h1>Board Title: {boardInfo.boardName}</h1>
				<h3>Board Desc: {boardInfo.boardDesc}</h3>
			</div>

			<Post title={"Test post 1"} content={"test content 1"} user={"test user 1"}></Post>
			<Post title={"Test post 2"} content={"test content 2"} user={"test user 2"}></Post>

			<CreateButton buttonName={"Create Post"} onClick={function (): void {
				throw new Error("Function not implemented.");
			} }></CreateButton>
		</Item.Group>
  	);
};

// Get boardID from query parameter
export async function getServerSideProps({ query }: any) {
  const bid = query.boardId;
  return { props: { test: bid } };
}

// TODO: HAVE THIS QUERY DATABASE FOR BOARDINFO
// Used to get boardinfo (title and desc)
// Currently holds dummy data
function getBoardInfo(boardId: string) {
	return {
		boardName: "Test Board",
		boardDesc: "Test Description"
	}
};

export default Board;
