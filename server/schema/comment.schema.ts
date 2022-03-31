import { Field, Int, ObjectType } from "type-graphql";
import { pre, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.schema";
import { Min, MinLength } from "class-validator";
import { Timestamp } from "./base.schema";
import { CommentModel, UserModel } from "./models";
import { ApolloError } from "apollo-server-errors";

@pre<Comment>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user comments, liked comments and disliked comments
		const filter = this.getFilter();
		try {
			const commentsToBeDeleted = await CommentModel.find(filter, {
				_id: 1,
			}).lean();
			const commentsToBeDeletedIds = commentsToBeDeleted.map(({ _id }) => _id);
			await UserModel.updateMany(null, {
				commentsIds: {
					$pullAll: commentsToBeDeletedIds,
				},
				likedCommentsIds: {
					$pullAll: commentsToBeDeletedIds,
				},
				dislikedCommentsIds: {
					$pullAll: commentsToBeDeletedIds,
				},
			}).lean();
		} catch {
			throw new ApolloError("db error cascading delete on users' comments");
		}
		next();
	}
)
@ObjectType()
export class Comment extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true })
	creatorName: String;

	@Field(() => String)
	@MinLength(1, {
		message: "Comment content must be at least 1 character long",
	})
	@prop({ required: true })
	content: string;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	likes: number;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	dislikes: number;

	@Field(() => String, { nullable: true })
	@prop({ default: null })
	parentId: string;

	@Field(() => String)
	@prop({ required: true })
	postId: string;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;
}
