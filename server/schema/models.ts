import { getModelForClass } from "@typegoose/typegoose";
import { Board } from "./board.schema";
import { Comment } from "./comment.schema";
import { Post } from "./post.schema";
import { User } from "./user.schema";

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
});
export const BoardModel = getModelForClass(Board, {
	schemaOptions: { timestamps: true },
});
export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});
export const CommentModel = getModelForClass(Comment, {
	schemaOptions: { timestamps: true },
});
