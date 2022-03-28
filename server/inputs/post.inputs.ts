import { prop, Ref } from "@typegoose/typegoose";
import { IsEmail, MinLength, MaxLength, Min } from "class-validator";
import { InputType, Field, Int } from "type-graphql";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class CreatePostInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	title?: string;

	@MinLength(1, {
		message: "Post content may not be empty",
	})
	@Field(() => String)
	@prop({ required: true })
	content: string;
}

@InputType()
export class PostIdInput {
	@Field(() => String)
	@prop({ required: true })
	_id: string;
}

@InputType()
export class UpdatePostInput {
	@Field(() => String, { nullable: true })
	@prop()
	title?: String;

	@Field(() => String)
	@MinLength(1, {
		message: "Post content must be at least 1 character long",
	})
	@prop()
	content: String;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	likes: number;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	dislikes: number;
}

@InputType()
export class PostsFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop()
	titleStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	titleEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	titleContains?: string;

	@Field(() => String, { nullable: true })
	@prop()
	contentStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	contentEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	contentContains?: string;

	@Field(() => Int, { nullable: true })
	@prop()
	likesLte?: number;

	@Field(() => Int, { nullable: true })
	@prop()
	likesGte?: number;

	@Field(() => Int, { nullable: true })
	@prop()
	dislikesLte?: number;

	@Field(() => Int, { nullable: true })
	@prop()
	dislikesGte?: number;

	@Field(() => String, { nullable: true })
	@prop()
	boardNameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	boardNameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	boardNameContains?: string;
}

@InputType()
export class GetPostsInput extends PostsFilterInput {}
