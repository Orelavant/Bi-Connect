import { Field, Int, ObjectType } from "type-graphql";
import { pre, prop } from "@typegoose/typegoose";
import { MinLength } from "class-validator";
import { Timestamp } from "./base.schema";
import { boardPreDelete } from "../hooks/pre/board.pre";

// @pre<Board>(
// 	["deleteOne", "deleteMany", "findOneAndDelete"],
// 	async function (next) {
// 		const filter = this.getFilter();
// 		try {
// 			// CASCADE on users and posts
// 			await boardPreDelete(filter);
// 		} catch (err) {
// 			throw err;
// 		}
// 		next();
// 	}
// )
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

	@Field(() => Int)
	@prop({ required: true })
	usersCount: number;

	// @Field(() => [User!]!)
	// @prop({ required: true, ref: () => User })
	// moderators: Ref<User>[];

	@Field(() => Int)
	@prop({ default: false })
	removed: boolean;
}
