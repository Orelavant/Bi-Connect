import { pre, prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { Min, MinLength } from "class-validator";
import { Timestamp } from "./base.schema";
import { commentPreDelete } from "../hooks/pre/comment.pre";

@pre<Comment>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user comments, liked comments and disliked comments
		const filter = this.getFilter();
		try {
			await commentPreDelete(filter);
		} catch (err) {
			throw err;
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
	creatorName: string;

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
