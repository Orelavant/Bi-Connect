import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
	BoardIdInput,
	CreateBoardInput,
	GetBoardsInput,
	UpdateBoardInput,
} from "../inputs/board.inputs";
import { UserIdInput } from "../inputs/user.inputs";
import { Board } from "../schema/board.schema";
import BoardService from "../service/board.service";

@Resolver()
export default class BoardResolver {
	constructor(private boardService: BoardService) {
		this.boardService = new BoardService();
	}

	@Query(() => Board)
	getBoard(@Arg("input") input: BoardIdInput) {
		return this.boardService.getBoard(input);
	}

	@Query(() => [Board!]!)
	getBoards(@Arg("input") input: GetBoardsInput) {
		return this.boardService.getBoards(input);
	}

	@Mutation(() => Board)
	createBoard(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("input") input: CreateBoardInput
	) {
		return this.boardService.createBoard(creatorDetails, input);
	}

	@Mutation(() => Board)
	updateBoard(
		@Arg("boardDetails") boardDetails: BoardIdInput,
		@Arg("input") input: UpdateBoardInput
	) {
		return this.boardService.updateBoard(boardDetails, input);
	}

	@Mutation(() => Board)
	removeBoard(@Arg("input") boardDetails: BoardIdInput) {
		return this.boardService.removeBoard(boardDetails);
	}

	@Mutation(() => Board)
	restoreBoard(@Arg("input") boardDetails: BoardIdInput) {
		return this.boardService.restoreBoard(boardDetails);
	}

	@Mutation(() => Board)
	deleteBoard(@Arg("input") input: BoardIdInput) {
		return this.boardService.deleteBoard(input);
	}
}
