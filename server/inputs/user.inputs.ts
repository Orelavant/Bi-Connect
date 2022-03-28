import { prop, Ref } from "@typegoose/typegoose";
import { IsEmail, MinLength, MaxLength, Min } from "class-validator";
import { InputType, Field } from "type-graphql";
import { ListFilterInput } from "./base.inputs";

@InputType()
export class CreateUserInput {
	@Field(() => String)
	username: string;

	@IsEmail()
	@Field(() => String)
	email: string;

	@MinLength(6, {
		message: "Password must be at least 6 characters long",
	})
	@MaxLength(50, {
		message: "Password cannot be more than 50 characters long",
	})
	@Field(() => String)
	password: string;
}

@InputType()
export class UserIdInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	username?: string;

	@IsEmail()
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	email?: string;
}

@InputType()
export class LoginInput {
	@IsEmail()
	@Field(() => String)
	email: string;

	@Field(() => String)
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	username?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	password?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	picture?: string;
}

@InputType()
export class UsersFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop({ required: false })
	usernameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	usernameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	usernameContains?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	emailStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	emailEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	emailContains?: string;

	@Field(() => Boolean, { nullable: true })
	@prop({ required: false })
	isVerified?: boolean;

	@Field(() => Boolean, { nullable: true })
	@prop({ required: false })
	isRemoved?: boolean;
}

@InputType()
export class GetUsersInput extends UsersFilterInput {}
