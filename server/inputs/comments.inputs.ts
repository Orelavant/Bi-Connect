import { prop, Ref } from "@typegoose/typegoose";
import {
	IsEmail,
	MinLength,
	MaxLength,
	Min,
	ValidateIf,
} from "class-validator";
import { InputType, Field, Int } from "type-graphql";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class CreateCommentInput {
	@MinLength(1, {
		message: "Comment content may not be empty",
	})
	@Field(() => String)
	@prop({ required: true })
	content: string;

	@Field(() => String, { nullable: true })
	@prop()
	parentId?: string;
}

@InputType()
export class CommentIdInput {
	@Field(() => String)
	@prop({ required: true })
	_id: string;
}

@InputType()
export class UpdateCommentInput {
	@MinLength(1, {
		message: "Comment content must be at least 1 character long",
	})
	@ValidateIf((_, val) => val != null)
	@Field(() => String, { nullable: true })
	@prop()
	content?: String;
}

@InputType()
export class CommentsFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop()
	contentStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	contentEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	contentContains?: string;

	@Field(() => String, { nullable: true })
	@prop()
	creatorNameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	creatorNameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	creatorNameContains?: string;

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
}

@InputType()
export class GetCommentsInput extends CommentsFilterInput {}
