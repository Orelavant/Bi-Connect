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

@Resolver()
export default class CommentResolver {
	constructor(private commentService: CommentService) {
		this.commentService = new CommentService();
	}

	@Query(() => Comment)
	getComment(@Arg("input") input: CommentIdInput) {
		return this.commentService.getComment(input);
	}

	@Query(() => [Comment!]!)
	getComments(@Arg("input") input: GetCommentsInput) {
		return this.commentService.getComments(input);
	}

	@Mutation(() => Comment)
	createComment(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("postDetails") postDetails: PostIdInput,
		@Arg("input") input: CreateCommentInput
	) {
		return this.commentService.createComment(
			creatorDetails,
			postDetails,
			input
		);
	}

	@Mutation(() => Comment)
	updateComment(
		@Arg("commentDetails") commentDetails: CommentIdInput,
		@Arg("input") input: UpdateCommentInput
	) {
		return this.commentService.updateComment(commentDetails, input);
	}

	@Mutation(() => Comment)
	removeComment(@Arg("input") input: CommentIdInput) {
		return this.commentService.removeComment(input);
	}

	@Mutation(() => Comment)
	restoreComment(@Arg("input") input: CommentIdInput) {
		return this.commentService.restoreComment(input);
	}

	@Mutation(() => Comment)
	deleteComment(@Arg("input") input: CommentIdInput) {
		return this.commentService.deleteComment(input);
	}
}
