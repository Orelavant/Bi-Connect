import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BoardIdInput } from "../inputs/board.inputs";
import {
	CreatePostInput,
	GetPostsInput,
	PostIdInput,
	PostsFilterInput,
	UpdatePostInput,
} from "../inputs/post.inputs";
import { UserIdInput } from "../inputs/user.inputs";
import { Comment } from "../schema/comment.schema";
import { Post } from "../schema/post.schema";
import PostService from "../service/post.service";
import { filterAttributes } from "../utils/misc";

@Resolver()
export default class PostResolver {
	constructor(private postService: PostService) {
		this.postService = new PostService();
	}

	@Query(() => Post)
	getPost(@Arg("input") input: PostIdInput) {
		const cleanedInput = filterAttributes<PostIdInput>(input, [
			null,
			undefined,
		]);
		return this.postService.getPost(cleanedInput);
	}

	@Query(() => [Post!]!)
	getPosts(@Arg("input") input: GetPostsInput) {
		const cleanedInput = filterAttributes<GetPostsInput>(input, [
			null,
			undefined,
		]);
		return this.postService.getPosts(cleanedInput);
	}

	@Query(() => [Comment!]!)
	getPostComments(@Arg("input") input: PostIdInput) {
		const cleanedInput = filterAttributes<PostIdInput>(input, [
			null,
			undefined,
		]);
		return this.postService.getPostComments(cleanedInput);
	}

	@Mutation(() => Post)
	createPost(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("boardDetails") boardDetails: BoardIdInput,
		@Arg("input") input: CreatePostInput
	) {
		const cleanedCreatorDetails = filterAttributes<UserIdInput>(
			creatorDetails,
			[null, undefined]
		);
		const cleanedBoardDetails = filterAttributes<BoardIdInput>(boardDetails, [
			null,
			undefined,
		]);
		const cleanedInput = filterAttributes<CreatePostInput>(input, [
			null,
			undefined,
		]);
		return this.postService.createPost(
			cleanedCreatorDetails,
			cleanedBoardDetails,
			cleanedInput
		);
	}

	@Mutation(() => Post)
	updatePost(
		@Arg("postDetails") postDetails: PostIdInput,
		@Arg("input") input: UpdatePostInput
	) {
		const cleanedPostDetails = filterAttributes<PostIdInput>(postDetails, [
			null,
			undefined,
		]);
		const cleanedInput = filterAttributes<UpdatePostInput>(input, [
			null,
			undefined,
		]);
		return this.postService.updatePost(cleanedPostDetails, cleanedInput);
	}

	@Mutation(() => Post)
	removePost(@Arg("input") input: PostIdInput) {
		const cleanedInput = filterAttributes<PostIdInput>(input, [
			null,
			undefined,
		]);
		return this.postService.removePost(cleanedInput);
	}

	@Mutation(() => Post)
	restorePost(@Arg("input") input: PostIdInput) {
		const cleanedInput = filterAttributes<PostIdInput>(input, [
			null,
			undefined,
		]);
		return this.postService.restorePost(cleanedInput);
	}

	@Mutation(() => Post)
	deletePost(@Arg("input") input: PostIdInput) {
		const cleanedInput = filterAttributes<PostIdInput>(input, [
			null,
			undefined,
		]);
		return this.postService.deletePost(cleanedInput);
	}
}
