import { Field, Int, ObjectType } from "type-graphql";
import { getModelForClass, pre, prop, index, Ref } from "@typegoose/typegoose";
import { User } from "./user.schema";
import { Board } from "./board.schema";
import { Min, MinLength } from "class-validator";
import { Post } from "./post.schema";
import { Timestamp } from "./base.schema";

@ObjectType()
export class Comment extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => User)
	@prop({ required: true, ref: () => User })
	creator: Ref<User>;

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
	parentId?: string;

	@Field(() => String)
	@prop({ required: true })
	postId: string;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;
}
