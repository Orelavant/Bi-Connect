import { prop, Ref } from "@typegoose/typegoose";
import { IsEmail, MinLength, ValidateIf } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class GetBoardInput {
	@Field(() => String)
	@prop({ required: true })
	name: string;
}

@InputType()
export class CreateBoardInput {
	@MinLength(1, {
		message: "Name may not be empty",
	})
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
	@MinLength(1, {
		message: "Name may not be empty",
	})
	@ValidateIf((_, val) => val != null)
	@Field(() => String, { nullable: true })
	@prop()
	name?: string;

	@Field(() => String, { nullable: true })
	@prop()
	description?: string;
}

@InputType()
export class BoardsFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop()
	nameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	nameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	nameContains?: string;

	@Field(() => String, { nullable: true })
	@prop()
	descriptionStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	descriptionEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	descriptionContains?: string;

	@Field(() => Int, { nullable: true })
	@prop()
	usersCountLte?: number;

	@Field(() => Int, { nullable: true })
	@prop()
	usersCountGte?: number;

	@Field(() => Boolean, { nullable: true })
	@prop()
	isRemoved?: boolean;
}

@InputType()
export class GetBoardsInput extends BoardsFilterInput {}

@InputType()
export class BoardIdInput {
	@Field(() => String)
	name: string;
}
