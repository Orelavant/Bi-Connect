import BoardResolver from "./board.resolver";
import CommentResolver from "./comment.resolver";
import PostResolver from "./post.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [
	UserResolver,
	BoardResolver,
	PostResolver,
	CommentResolver,
] as const;
