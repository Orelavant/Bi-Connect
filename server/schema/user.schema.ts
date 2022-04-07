import { pre, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Timestamp } from "./base.schema";
import { userPreDelete, userPreSave } from "../hooks/pre/user.pre";

@pre<User>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user comments, liked comments and disliked comments, same with posts
		const filter = this.getFilter();
		try {
			await userPreDelete(filter);
		} catch (err) {
			throw err;
		}
		next();
	}
)
@pre<User>("save", async function (next) {
	try {
		await userPreSave(this);
	} catch (err) {
		throw err;
	}
	next();
})
@ObjectType()
export class User extends Timestamp {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true, unique: true })
	username: string;

	@Field(() => String)
	@prop({ required: true, unique: true })
	email: string;

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	followedBoardsNames: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	postsIds: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	likedPostsIds: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	dislikedPostsIds: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	commentsIds: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	likedCommentsIds: string[];

	@Field(() => [String!]!)
	@prop({ default: [], type: String })
	dislikedCommentsIds: string[];

	@prop({ required: true })
	password: string;

	@Field(() => String)
	@prop({ default: "" })
	picture: string;

	@Field(() => Boolean)
	@prop({ default: false })
	verified: boolean;

	@Field(() => Boolean)
	@prop({ default: false })
	removed: boolean;

	@Field(() => Boolean)
	@prop({ default: false })
	admin: boolean;
}
