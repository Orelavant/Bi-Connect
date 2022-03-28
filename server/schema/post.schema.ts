import { Field, Int, ObjectType } from "type-graphql";
import { getModelForClass, pre, prop, index, Ref } from "@typegoose/typegoose";
import { IsEmail, MaxLength, Min, MinLength } from "class-validator";
import { User } from "./user.schema";
import { Board } from "./board.schema";
import { Comment } from "./comment.schema";
import { Timestamp } from "./base.schema";

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
	@MinLength(1, {
		message: "Post content must be at least 1 character long",
	})
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
