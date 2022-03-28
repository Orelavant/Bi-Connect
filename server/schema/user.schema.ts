import { getModelForClass, pre, prop, index, Ref } from "@typegoose/typegoose";
import { IsEmail, MaxLength, Min, MinLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { Board } from "./board.schema";
import { Post } from "./post.schema";
import { Comment } from "./comment.schema";
import { Timestamp } from "./base.schema";

// @Field is for graphql
// @prop is for gooses

@pre<User>("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
	}
	next();
})
@index({ email: 1 })
@ObjectType()
export class User extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true, unique: true })
	username: string;

	@Field(() => String)
	@prop({ required: true, unique: true })
	email: string;

	@Field(() => [Board!]!)
	@prop({ default: [], ref: () => Board })
	followedBoards: Ref<Board>[];

	@Field(() => [Board!]!)
	@prop({ default: [], ref: () => Board })
	moderatorBoards: Ref<Board>[];

	@Field(() => [Post!]!)
	@prop({ default: [], ref: () => Post })
	posts: Ref<Post>[];

	@Field(() => [Post!]!)
	@prop({ default: [], ref: () => Post })
	likedPosts: Ref<Post>[];

	@Field(() => [Post!]!)
	@prop({ default: [], ref: () => Post })
	dislikedPosts: Ref<Post>[];

	@Field(() => [Comment!]!)
	@prop({ default: [], ref: () => Comment })
	comments: Ref<Comment>[];

	@Field(() => [Comment!]!)
	@prop({ default: [], ref: () => Comment })
	likedComments: Ref<Comment>[];

	@Field(() => [Comment!]!)
	@prop({ default: [], ref: () => Comment })
	dislikedComments: Ref<Comment>[];

	@prop({ required: true })
	password: string;

	@Field(() => String)
	@prop({ default: "" })
	picture: string;

	@Field(() => Boolean)
	@prop({ default: false })
	verified: boolean;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;
}
