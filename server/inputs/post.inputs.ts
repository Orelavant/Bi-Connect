import { prop } from "@typegoose/typegoose";
import { MinLength, Min, ValidateIf } from "class-validator";
import { InputType, Field, Int } from "type-graphql";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class CreatePostInput {
	@Field(() => String, { nullable: true })
	@prop()
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

	@MinLength(1, {
		message: "Post content may not be empty",
	})
	@ValidateIf((_, val) => val != null)
	@Field(() => String, { nullable: true })
	@prop()
	content?: String;
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
