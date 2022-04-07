import { Field, Int, ObjectType } from "type-graphql";
import { prop, index, Ref, pre } from "@typegoose/typegoose";
import { Min, MinLength } from "class-validator";
import { Timestamp } from "./base.schema";
import { postPreDelete } from "../hooks/pre/post.pre";

@pre<Post>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user posts and post's comments
		const filter = this.getFilter();
		try {
			await postPreDelete(filter);
		} catch (err) {
			throw err;
		}
		next();
	}
)
@ObjectType()
export class Post extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String, { nullable: true })
	@prop({ required: true })
	creatorName?: string;

	@Field(() => String, { nullable: true })
	@prop({ required: false })
	title?: String;

	@Field(() => String)
	@prop({ required: true })
	content: String;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	likes: number;

	@Min(0)
	@Field(() => Int)
	@prop({ default: 0 })
	dislikes: number;

	@Field(() => String)
	@prop({ required: true })
	boardName: string;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;
}
