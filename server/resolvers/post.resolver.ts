import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { BoardIdInput } from "../inputs/board.inputs";
import {
	CreatePostInput,
	GetPostsInput,
	PostIdInput,
	UpdatePostInput,
} from "../inputs/post.inputs";
import { UserIdInput } from "../inputs/user.inputs";
import { Board as Post } from "../schema/board.schema";
import PostService from "../service/post.service";

@Resolver()
export default class PostResolver {
	constructor(private postService: PostService) {
		this.postService = new PostService();
	}

	@Query(() => Post, { nullable: true })
	getPost(@Arg("input") input: PostIdInput) {
		return this.postService.getPost(input);
	}

	@Query(() => [Post!]!)
	getPosts(@Arg("input") input: GetPostsInput) {
		return this.postService.getPosts(input);
	}

	@Mutation(() => Post)
	createPost(
		@Arg("creatorDetails") creatorDetails: UserIdInput,
		@Arg("boardDetails") boardDetails: BoardIdInput,
		@Arg("input") input: CreatePostInput
	) {
		return this.postService.createPost(creatorDetails, boardDetails, input);
	}

	@Mutation(() => Post, { nullable: true })
	updatePost(
		@Arg("postDetails") postDetails: PostIdInput,
		@Arg("input") input: UpdatePostInput
	) {
		return this.postService.updatePost(postDetails, input);
	}

	@Mutation(() => Post, { nullable: true })
	removePost(@Arg("input") input: PostIdInput) {
		return this.postService.removePost(input);
	}

	@Mutation(() => Post, { nullable: true })
	restorePost(@Arg("input") input: PostIdInput) {
		return this.postService.restorePost(input);
	}

	@Mutation(() => Post, { nullable: true })
	deletePost(@Arg("input") input: PostIdInput) {
		return this.postService.deletePost(input);
	}
}
