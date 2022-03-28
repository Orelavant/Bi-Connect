import { prop } from "@typegoose/typegoose";
import { Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PaginationInput {
	@Min(0)
	@Field(() => Int, { nullable: true })
	@prop({ default: 0, required: false })
	limit?: number;

	@Min(0)
	@Field(() => Int, { nullable: true })
	@prop({ default: 0, required: false })
	offset?: number;
}

@InputType()
export class TimestampFilterInput {
	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	createdAtBefore?: Date;

	@Min(0)
	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	createdAtAfter?: Date;

	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	updatedAtBefore?: Date;

	@Min(0)
	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	updatedAtAfter?: Date;
}

@InputType()
export class ListFilterInput {
	@Min(0)
	@Field(() => Int, { nullable: true })
	@prop({ default: 0, required: false })
	limit?: number;

	@Min(0)
	@Field(() => Int, { nullable: true })
	@prop({ default: 0, required: false })
	offset?: number;

	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	createdAtBefore?: Date;

	@Min(0)
	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	createdAtAfter?: Date;

	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	updatedAtBefore?: Date;

	@Min(0)
	@Field(() => Date, { nullable: true })
	@prop({ required: false })
	updatedAtAfter?: Date;
}
