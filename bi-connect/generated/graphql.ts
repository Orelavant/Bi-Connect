import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Board = {
  __typename?: 'Board';
  _id: Scalars['String'];
  banner: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  removed: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  usersCount: Scalars['Int'];
};

export type BoardIdInput = {
  name: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creatorName: Scalars['String'];
  dislikes: Scalars['Int'];
  likes: Scalars['Int'];
  parentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  removed: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type CommentIdInput = {
  _id: Scalars['String'];
};

export type CreateBoardInput = {
  banner?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type CreateCommentInput = {
  content: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};

export type CreatePostInput = {
  content: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type GetBoardsInput = {
  createdAtAfter?: InputMaybe<Scalars['DateTime']>;
  createdAtBefore?: InputMaybe<Scalars['DateTime']>;
  descriptionContains?: InputMaybe<Scalars['String']>;
  descriptionEndsWith?: InputMaybe<Scalars['String']>;
  descriptionStartsWith?: InputMaybe<Scalars['String']>;
  isRemoved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  nameContains?: InputMaybe<Scalars['String']>;
  nameEndsWith?: InputMaybe<Scalars['String']>;
  nameStartsWith?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  updatedAtAfter?: InputMaybe<Scalars['DateTime']>;
  updatedAtBefore?: InputMaybe<Scalars['DateTime']>;
  usersCountGte?: InputMaybe<Scalars['Int']>;
  usersCountLte?: InputMaybe<Scalars['Int']>;
};

export type GetCommentsInput = {
  contentContains?: InputMaybe<Scalars['String']>;
  contentEndsWith?: InputMaybe<Scalars['String']>;
  contentStartsWith?: InputMaybe<Scalars['String']>;
  createdAtAfter?: InputMaybe<Scalars['DateTime']>;
  createdAtBefore?: InputMaybe<Scalars['DateTime']>;
  creatorNameContains?: InputMaybe<Scalars['String']>;
  creatorNameEndsWith?: InputMaybe<Scalars['String']>;
  creatorNameStartsWith?: InputMaybe<Scalars['String']>;
  dislikesGte?: InputMaybe<Scalars['Int']>;
  dislikesLte?: InputMaybe<Scalars['Int']>;
  likesGte?: InputMaybe<Scalars['Int']>;
  likesLte?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  updatedAtAfter?: InputMaybe<Scalars['DateTime']>;
  updatedAtBefore?: InputMaybe<Scalars['DateTime']>;
};

export type GetPostsInput = {
  boardNameContains?: InputMaybe<Scalars['String']>;
  boardNameEndsWith?: InputMaybe<Scalars['String']>;
  boardNameStartsWith?: InputMaybe<Scalars['String']>;
  contentContains?: InputMaybe<Scalars['String']>;
  contentEndsWith?: InputMaybe<Scalars['String']>;
  contentStartsWith?: InputMaybe<Scalars['String']>;
  createdAtAfter?: InputMaybe<Scalars['DateTime']>;
  createdAtBefore?: InputMaybe<Scalars['DateTime']>;
  dislikesGte?: InputMaybe<Scalars['Int']>;
  dislikesLte?: InputMaybe<Scalars['Int']>;
  likesGte?: InputMaybe<Scalars['Int']>;
  likesLte?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  titleContains?: InputMaybe<Scalars['String']>;
  titleEndsWith?: InputMaybe<Scalars['String']>;
  titleStartsWith?: InputMaybe<Scalars['String']>;
  updatedAtAfter?: InputMaybe<Scalars['DateTime']>;
  updatedAtBefore?: InputMaybe<Scalars['DateTime']>;
};

export type GetUsersInput = {
  createdAtAfter?: InputMaybe<Scalars['DateTime']>;
  createdAtBefore?: InputMaybe<Scalars['DateTime']>;
  emailContains?: InputMaybe<Scalars['String']>;
  emailEndsWith?: InputMaybe<Scalars['String']>;
  emailStartsWith?: InputMaybe<Scalars['String']>;
  isRemoved?: InputMaybe<Scalars['Boolean']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  updatedAtAfter?: InputMaybe<Scalars['DateTime']>;
  updatedAtBefore?: InputMaybe<Scalars['DateTime']>;
  usernameContains?: InputMaybe<Scalars['String']>;
  usernameEndsWith?: InputMaybe<Scalars['String']>;
  usernameStartsWith?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createComment: Comment;
  createPost: Post;
  createUser: User;
  deleteBoard: Board;
  deleteComment: Comment;
  deletePost: Post;
  login: Scalars['String'];
  loginAdmin: Scalars['String'];
  removeBoard: Board;
  removeComment: Comment;
  removePost: Post;
  removeUser: User;
  restoreBoard: Board;
  restoreComment: Comment;
  restorePost: Post;
  restoreUser: User;
  updateBoard: Board;
  updateComment: Comment;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateBoardArgs = {
  creatorDetails: UserIdInput;
  input: CreateBoardInput;
};


export type MutationCreateCommentArgs = {
  creatorDetails: UserIdInput;
  input: CreateCommentInput;
  postDetails: PostIdInput;
};


export type MutationCreatePostArgs = {
  boardDetails: BoardIdInput;
  creatorDetails: UserIdInput;
  input: CreatePostInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBoardArgs = {
  input: BoardIdInput;
};


export type MutationDeleteCommentArgs = {
  input: CommentIdInput;
};


export type MutationDeletePostArgs = {
  input: PostIdInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginAdminArgs = {
  input: LoginInput;
};


export type MutationRemoveBoardArgs = {
  input: BoardIdInput;
};


export type MutationRemoveCommentArgs = {
  input: CommentIdInput;
};


export type MutationRemovePostArgs = {
  input: PostIdInput;
};


export type MutationRemoveUserArgs = {
  input: UserIdInput;
};


export type MutationRestoreBoardArgs = {
  input: BoardIdInput;
};


export type MutationRestoreCommentArgs = {
  input: CommentIdInput;
};


export type MutationRestorePostArgs = {
  input: PostIdInput;
};


export type MutationRestoreUserArgs = {
  input: UserIdInput;
};


export type MutationUpdateBoardArgs = {
  boardDetails: BoardIdInput;
  input: UpdateBoardInput;
};


export type MutationUpdateCommentArgs = {
  commentDetails: CommentIdInput;
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  postDetails: PostIdInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  userDetails: UserIdInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String'];
  boardName: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  creatorName?: Maybe<Scalars['String']>;
  dislikes: Scalars['Int'];
  likes: Scalars['Int'];
  removed: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type PostIdInput = {
  _id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  deleteUser: User;
  getBoard: Board;
  getBoards: Array<Board>;
  getComment: Comment;
  getComments: Array<Comment>;
  getPost: Post;
  getPostComments: Array<Comment>;
  getPosts: Array<Post>;
  getUser: User;
  getUsers: Array<User>;
  isAdminLoggedIn?: Maybe<User>;
  isLoggedIn?: Maybe<User>;
};


export type QueryDeleteUserArgs = {
  input: UserIdInput;
};


export type QueryGetBoardArgs = {
  input: BoardIdInput;
};


export type QueryGetBoardsArgs = {
  input: GetBoardsInput;
};


export type QueryGetCommentArgs = {
  input: CommentIdInput;
};


export type QueryGetCommentsArgs = {
  input: GetCommentsInput;
};


export type QueryGetPostArgs = {
  input: PostIdInput;
};


export type QueryGetPostCommentsArgs = {
  input: PostIdInput;
};


export type QueryGetPostsArgs = {
  input: GetPostsInput;
};


export type QueryGetUserArgs = {
  input: UserIdInput;
};


export type QueryGetUsersArgs = {
  input: GetUsersInput;
};

export type UpdateBoardInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  content?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  password?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  admin: Scalars['Boolean'];
  commentsIds: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dislikedCommentsIds: Array<Scalars['String']>;
  dislikedPostsIds: Array<Scalars['String']>;
  email: Scalars['String'];
  followedBoardsNames: Array<Scalars['String']>;
  likedCommentsIds: Array<Scalars['String']>;
  likedPostsIds: Array<Scalars['String']>;
  picture: Scalars['String'];
  postsIds: Array<Scalars['String']>;
  removed: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserIdInput = {
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type CreateBoardMutationVariables = Exact<{
  input: CreateBoardInput;
  creatorDetails: UserIdInput;
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', name: string, description: string } };

export type GetBoardsQueryVariables = Exact<{
  input: GetBoardsInput;
}>;


export type GetBoardsQuery = { __typename?: 'Query', getBoards: Array<{ __typename?: 'Board', name: string, description: string }> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
  boardDetails: BoardIdInput;
  creatorDetails: UserIdInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', creatorName?: string | null, title?: string | null, content: string, boardName: string } };

export type GetPostQueryVariables = Exact<{
  input: PostIdInput;
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', _id: string, creatorName?: string | null, title?: string | null, content: string } };

export type GetPostsQueryVariables = Exact<{
  input: GetPostsInput;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', _id: string, creatorName?: string | null, title?: string | null, content: string }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, username: string } };

export type LoginAdminMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: string };

export type GetUsersQueryVariables = Exact<{
  input: GetUsersInput;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', username: string, email: string }> };

export type IsAdminLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAdminLoggedInQuery = { __typename?: 'Query', isAdminLoggedIn?: { __typename?: 'User', username: string, email: string, admin: boolean } | null };


export const CreateBoardDocument = `
    mutation createBoard($input: CreateBoardInput!, $creatorDetails: UserIdInput!) {
  createBoard(input: $input, creatorDetails: $creatorDetails) {
    name
    description
  }
}
    `;
export const useCreateBoardMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateBoardMutation, TError, CreateBoardMutationVariables, TContext>
    ) =>
    useMutation<CreateBoardMutation, TError, CreateBoardMutationVariables, TContext>(
      ['createBoard'],
      (variables?: CreateBoardMutationVariables) => fetcher<CreateBoardMutation, CreateBoardMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateBoardDocument, variables)(),
      options
    );
export const GetBoardsDocument = `
    query getBoards($input: GetBoardsInput!) {
  getBoards(input: $input) {
    name
    description
  }
}
    `;
export const useGetBoardsQuery = <
      TData = GetBoardsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetBoardsQueryVariables,
      options?: UseQueryOptions<GetBoardsQuery, TError, TData>
    ) =>
    useQuery<GetBoardsQuery, TError, TData>(
      ['getBoards', variables],
      fetcher<GetBoardsQuery, GetBoardsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBoardsDocument, variables),
      options
    );
export const CreatePostDocument = `
    mutation createPost($input: CreatePostInput!, $boardDetails: BoardIdInput!, $creatorDetails: UserIdInput!) {
  createPost(
    input: $input
    boardDetails: $boardDetails
    creatorDetails: $creatorDetails
  ) {
    creatorName
    title
    content
    boardName
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      ['createPost'],
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreatePostDocument, variables)(),
      options
    );
export const GetPostDocument = `
    query getPost($input: PostIdInput!) {
  getPost(input: $input) {
    _id
    creatorName
    title
    content
  }
}
    `;
export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostQueryVariables,
      options?: UseQueryOptions<GetPostQuery, TError, TData>
    ) =>
    useQuery<GetPostQuery, TError, TData>(
      ['getPost', variables],
      fetcher<GetPostQuery, GetPostQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostDocument, variables),
      options
    );
export const GetPostsDocument = `
    query getPosts($input: GetPostsInput!) {
  getPosts(input: $input) {
    _id
    creatorName
    title
    content
  }
}
    `;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      ['getPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPostsDocument, variables),
      options
    );
export const CreateUserDocument = `
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    email
    username
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['createUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables)(),
      options
    );
export const LoginAdminDocument = `
    mutation loginAdmin($input: LoginInput!) {
  loginAdmin(input: $input)
}
    `;
export const useLoginAdminMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<LoginAdminMutation, TError, LoginAdminMutationVariables, TContext>
    ) =>
    useMutation<LoginAdminMutation, TError, LoginAdminMutationVariables, TContext>(
      ['loginAdmin'],
      (variables?: LoginAdminMutationVariables) => fetcher<LoginAdminMutation, LoginAdminMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, LoginAdminDocument, variables)(),
      options
    );
export const GetUsersDocument = `
    query getUsers($input: GetUsersInput!) {
  getUsers(input: $input) {
    username
    email
  }
}
    `;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      ['getUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables),
      options
    );
export const IsAdminLoggedInDocument = `
    query isAdminLoggedIn {
  isAdminLoggedIn {
    username
    email
    admin
  }
}
    `;
export const useIsAdminLoggedInQuery = <
      TData = IsAdminLoggedInQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: IsAdminLoggedInQueryVariables,
      options?: UseQueryOptions<IsAdminLoggedInQuery, TError, TData>
    ) =>
    useQuery<IsAdminLoggedInQuery, TError, TData>(
      variables === undefined ? ['isAdminLoggedIn'] : ['isAdminLoggedIn', variables],
      fetcher<IsAdminLoggedInQuery, IsAdminLoggedInQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, IsAdminLoggedInDocument, variables),
      options
    );