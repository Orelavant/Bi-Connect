import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BoardIdInput } from "../inputs/board.inputs";
import {
	CommentIdInput,
	CreateCommentInput,
	GetCommentsInput,
	UpdateCommentInput,
} from "../inputs/comments.inputs";
import { PostIdInput } from "../inputs/post.inputs";

import { UserIdInput } from "../inputs/user.inputs";
import { Comment } from "../schema/comment.schema";
import CommentService from "../service/comment.service";
import { filterAttributes } from "../utils/misc";

@Resolver()
export default class CommentResolver {
	constructor(private commentService: CommentService) {
		this.commentService = new CommentService();
	}

	@Query(() => Comment)
	getComment(@Arg("input") input: CommentIdInput) {
		const cleanedInput = filterAttributes<CommentIdInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.getComment(cleanedInput);
	}

	@Query(() => [Comment!]!)
	getComments(@Arg("input") input: GetCommentsInput) {
		const cleanedInput = filterAttributes<GetCommentsInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.getComments(cleanedInput);
	}

	@Mutation(() => Comment)
	createComment(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("postDetails") postDetails: PostIdInput,
		@Arg("input") input: CreateCommentInput
	) {
		const cleanedCreatorDetails = filterAttributes<UserIdInput>(
			creatorDetails,
			[null, undefined]
		);
		const cleanedPostDetails = filterAttributes<PostIdInput>(postDetails, [
			null,
			undefined,
		]);
		const cleanedInput = filterAttributes<CreateCommentInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.createComment(
			cleanedCreatorDetails,
			cleanedPostDetails,
			cleanedInput
		);
	}

	@Mutation(() => Comment)
	updateComment(
		@Arg("commentDetails") commentDetails: CommentIdInput,
		@Arg("input") input: UpdateCommentInput
	) {
		const cleanedCommentDetails = filterAttributes<CommentIdInput>(
			commentDetails,
			[null, undefined]
		);
		const cleanedInput = filterAttributes<UpdateCommentInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.updateComment(
			cleanedCommentDetails,
			cleanedInput
		);
	}

	@Mutation(() => Comment)
	removeComment(@Arg("input") input: CommentIdInput) {
		const cleanedInput = filterAttributes<CommentIdInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.removeComment(cleanedInput);
	}

	@Mutation(() => Comment)
	restoreComment(@Arg("input") input: CommentIdInput) {
		const cleanedInput = filterAttributes<CommentIdInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.restoreComment(cleanedInput);
	}

	@Mutation(() => Comment)
	deleteComment(@Arg("input") input: CommentIdInput) {
		const cleanedInput = filterAttributes<CommentIdInput>(input, [
			null,
			undefined,
		]);
		return this.commentService.deleteComment(cleanedInput);
	}
}
