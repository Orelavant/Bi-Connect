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
import { filterAttributes } from "../utils/misc";

@Resolver()
export default class BoardResolver {
	constructor(private boardService: BoardService) {
		this.boardService = new BoardService();
	}

	@Query(() => Board)
	getBoard(@Arg("input") input: BoardIdInput) {
		const cleanedInput = filterAttributes<BoardIdInput>(input, [
			null,
			undefined,
		]);
		return this.boardService.getBoard(input);
	}

	@Query(() => [Board!]!)
	getBoards(@Arg("input") input: GetBoardsInput) {
		const cleanedInput = filterAttributes<GetBoardsInput>(input, [
			null,
			undefined,
		]);
		return this.boardService.getBoards(cleanedInput);
	}

	@Mutation(() => Board)
	createBoard(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("input") input: CreateBoardInput
	) {
		const cleanedCreatorDetails = filterAttributes<UserIdInput>(
			creatorDetails,
			[null, undefined]
		);
		const cleanedInput = filterAttributes<CreateBoardInput>(input, [
			null,
			undefined,
		]);
		return this.boardService.createBoard(cleanedCreatorDetails, cleanedInput);
	}

	@Mutation(() => Board)
	updateBoard(
		@Arg("boardDetails") boardDetails: BoardIdInput,
		@Arg("input") input: UpdateBoardInput
	) {
		const cleanedBoardDetails = filterAttributes<BoardIdInput>(boardDetails, [
			null,
			undefined,
		]);
		const cleanedInput = filterAttributes<UpdateBoardInput>(input, [
			null,
			undefined,
		]);
		return this.boardService.updateBoard(cleanedBoardDetails, cleanedInput);
	}

	@Mutation(() => Board)
	removeBoard(@Arg("input") boardDetails: BoardIdInput) {
		const cleanedBoardDetails = filterAttributes<BoardIdInput>(boardDetails, [
			null,
			undefined,
		]);
		return this.boardService.removeBoard(cleanedBoardDetails);
	}

	@Mutation(() => Board)
	restoreBoard(@Arg("input") boardDetails: BoardIdInput) {
		const cleanedBoardDetails = filterAttributes<BoardIdInput>(boardDetails, [
			null,
			undefined,
		]);
		return this.boardService.restoreBoard(cleanedBoardDetails);
	}

	@Mutation(() => Board)
	deleteBoard(@Arg("input") input: BoardIdInput) {
		const cleanedInput = filterAttributes<BoardIdInput>(input, [
			null,
			undefined,
		]);
		return this.boardService.deleteBoard(cleanedInput);
	}
}
