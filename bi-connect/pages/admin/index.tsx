import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/UserIndexPage.module.scss";
import Tab from "../../components/Tab";
import UserTabListItem from "../../components/UserTabListItem";
import BoardTabListItem from "../../components/BoardTabListItem";
import { useGetBoardsQuery, useGetUsersQuery } from "../../generated/graphql";
import CreateUserDialog from "../../components/CreateUserDialog";
import CreateBoardDialog from "../../components/CreateBoardDialog";

const endpoint = "http://localhost:3001/graphql";

const Home: NextPage = () => {
	const {
		data: boardData,
		isLoading: boardIsLoading,
		isError: boardIsError,
		isSuccess: boardIsSuccess,
	} = useGetBoardsQuery(
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

	const {
		data: userData,
		isLoading: userIsLoading,
		isError: userIsError,
		isSuccess: userIsSuccess,
	} = useGetUsersQuery(
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

	return (
		<div className={styles.container}>
			<Head>
				<title>Bi-Connect</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles["admin-user-board-tab-container"]}>
				<Tab
					tabs={{
						Users: {
							data: !userIsLoading && userIsSuccess ? userData.getUsers : null,
							renderComponent: UserTabListItem,
							createButtonDialog: <CreateUserDialog />,
						},
						Boards: {
							data:
								!boardIsLoading && boardIsSuccess ? boardData.getBoards : null,
							renderComponent: BoardTabListItem,
							createButtonDialog: <CreateBoardDialog />,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default Home;
