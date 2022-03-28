import { Field, InputType, Int, ObjectType } from "type-graphql";
import { getModelForClass, pre, prop, index, Ref } from "@typegoose/typegoose";
import { IsEmail, MaxLength, Min, MinLength } from "class-validator";
import { User } from "./user.schema";
import { Timestamp } from "./base.schema";

@ObjectType()
export class Board extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@MinLength(1, {
		message: "Board name must be at least 1 character long",
	})
	@prop({ required: true, unique: true })
	name: string;

	@Field(() => String)
	@prop({ default: "" })
	description: string;

	@Field(() => String)
	@prop({ default: "" })
	picture: string;

	@Field(() => String)
	@prop({ default: "" })
	banner: string;

	@Field(() => [User])
	@prop({ required: true, ref: () => User })
	users: Ref<User>[];

	@Field(() => Int)
	@prop({ required: true })
	usersCount: number;

	@Field(() => [User!]!)
	@prop({ required: true, ref: () => User })
	moderators: Ref<User>[];
}
