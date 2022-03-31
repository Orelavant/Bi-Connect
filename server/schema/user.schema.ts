import { pre, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";
import { Post } from "./post.schema";
import { Timestamp } from "./base.schema";
import { ApolloError } from "apollo-server-errors";
import { UserModel } from "./models";

@pre<User>(
	["deleteOne", "deleteMany", "findOneAndDelete"],
	async function (next) {
		// CASCADE on user comments, liked comments and disliked comments
		const filter = this.getFilter();
		try {
			const usersToBeDeleted = await UserModel.find(filter, {
				name: 1,
			}).lean();
			const usersToBeDeletedUserNames = usersToBeDeleted.map(
				({ username }) => username
			);
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
@pre<User>("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
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
}
