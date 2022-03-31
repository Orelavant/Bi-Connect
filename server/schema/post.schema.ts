import { Field, Int, ObjectType } from "type-graphql";
import { prop, index, Ref, pre } from "@typegoose/typegoose";
import { Min, MinLength } from "class-validator";
import { Timestamp } from "./base.schema";
import { CommentModel, PostModel, UserModel } from "./models";
import { ApolloError } from "apollo-server-errors";

@pre<Post>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user posts and post's comments
		const filter = this.getFilter();
		try {
			const postsToBeDeleted = await PostModel.find(filter, {
				_id: 1,
			}).lean();
			const postsToBeDeletedIds = postsToBeDeleted.map(({ _id }) => _id);
			await UserModel.updateMany(null, {
				postsIds: {
					$pullAll: postsToBeDeletedIds,
				},
				likedPostsIds: {
					$pullAll: postsToBeDeletedIds,
				},
				dislikedPostsIds: {
					$pullAll: postsToBeDeletedIds,
				},
			}).lean();
			await CommentModel.deleteMany(null, {
				postId: {
					$in: postsToBeDeletedIds,
				},
			}).lean();
		} catch {
			throw new ApolloError(
				"db error cascading delete on users' posts and post's comments"
			);
		}
		next();
	}
)
@ObjectType()
export class Post extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String, { nullable: true })
	@prop({ required: true })
	creatorName?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	title?: String;

	@Field(() => String)
	@prop({ required: true })
	content: String;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	likes: number;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	dislikes: number;

	@Field(() => String)
	@prop({ required: true })
	boardName: string;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;
}
