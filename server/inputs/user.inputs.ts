import { prop } from "@typegoose/typegoose";
import { IsEmail, MinLength, MaxLength } from "class-validator";
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
	@prop()
	username?: string;

	@IsEmail()
	@Field(() => String, { nullable: true })
	@prop()
	email?: string;
}

@InputType()
export class LoginInput {
	@Field(() => String)
	username: string;

	@Field(() => String)
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field(() => String, { nullable: true })
	@prop()
	username?: string;

	@Field(() => String, { nullable: true })
	@prop()
	password?: string;

	@Field(() => String, { nullable: true })
	@prop()
	picture?: string;
}

@InputType()
export class UsersFilterInput extends ListFilterInput {
	@Field(() => String, { nullable: true })
	@prop()
	usernameStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	usernameEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	usernameContains?: string;

	@Field(() => String, { nullable: true })
	@prop()
	emailStartsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	emailEndsWith?: string;

	@Field(() => String, { nullable: true })
	@prop()
	emailContains?: string;

	@Field(() => Boolean, { nullable: true })
	@prop()
	isVerified?: boolean;

	@Field(() => Boolean, { nullable: true })
	@prop()
	isRemoved?: boolean;
}

@InputType()
export class GetUsersInput extends UsersFilterInput {}
