import { Field, Int, ObjectType } from "type-graphql";
import { pre, prop, Ref } from "@typegoose/typegoose";
import { MinLength } from "class-validator";
import { User } from "./user.schema";
import { Timestamp } from "./base.schema";
import { BoardModel, PostModel, UserModel } from "./models";
import { ApolloError } from "apollo-server-errors";

@pre<Board>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user comments, liked comments and disliked comments
		const filter = this.getFilter();
		try {
			const boardsToBeDeleted = await BoardModel.find(filter, {
				name: 1,
			}).lean();
			const boardsToBeDeletedNames = boardsToBeDeleted.map(({ name }) => name);
			await UserModel.updateMany(null, {
				followedBoardsNames: {
					$pullAll: boardsToBeDeletedNames,
				},
			}).lean();
			await PostModel.deleteMany(null, {
				boardName: { $in: boardsToBeDeletedNames },
			}).lean();
		} catch {
			throw new ApolloError("db error cascading delete on users' comments");
		}
		next();
	}
)
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
