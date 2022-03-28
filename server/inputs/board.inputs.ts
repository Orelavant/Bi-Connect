import { prop, Ref } from "@typegoose/typegoose";
import { IsEmail, MinLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { User } from "../schema/user.schema";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class GetBoardInput {
	@Field(() => String)
	@prop({ required: true })
	name: string;
}

@InputType()
export class CreateBoardInput {
	@Field(() => String)
	@prop({ required: true })
	name: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	description?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	picture?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	banner?: string;
}

@InputType()
export class UpdateBoardInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	name?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	description?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	picture?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	banner?: string;
}

@InputType()
export class BoardsFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	nameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	nameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	nameContains?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	descriptionStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	descriptionEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	descriptionContains?: string;

	@Field(() => Int, { nullable: true })
	@prop({ required: false })
	usersCountLte?: number;

	@Field(() => Int, { nullable: true })
	@prop({ required: false })
	usersCountGte?: number;
}

@InputType()
export class GetBoardsInput extends BoardsFilterInput {}

@InputType()
export class BoardIdInput {
	@Field(() => String)
	name: string;
}
