import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
	CreateUserInput,
	UserIdInput,
	GetUsersInput,
	LoginInput,
	UpdateUserInput,
} from "../inputs/user.inputs";
import { User } from "../schema/user.schema";
import UserService from "../service/user.service";
import { Context } from "../types/context";

@Resolver()
export default class UserResolver {
	constructor(private userService: UserService) {
		this.userService = new UserService();
	}

	@Mutation(() => User)
	createUser(@Arg("input") input: CreateUserInput) {
		return this.userService.createUser(input);
	}

	@Mutation(() => User)
	updateUser(
		@Arg("userDetails") userDetails: UserIdInput,
		@Arg("input") input: UpdateUserInput
	) {
		return this.userService.updateUser(userDetails, input);
	}

	@Mutation(() => String)
	login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
		return this.userService.login(input, context);
	}

	@Mutation(() => String)
	loginAdmin(@Arg("input") input: LoginInput, @Ctx() context: Context) {
		return this.userService.loginAdmin(input, context);
	}

	@Query(() => User, { nullable: true })
	isLoggedIn(@Ctx() context: Context) {
		return context.user;
	}

	@Query(() => User, { nullable: true })
	isAdminLoggedIn(@Ctx() context: Context) {
		return context.user?.admin ? context.user : null;
	}

	@Query(() => User)
	getUser(@Arg("input") input: UserIdInput) {
		return this.userService.getUser(input);
	}

	@Query(() => [User!]!)
	getUsers(@Arg("input") input: GetUsersInput) {
		return this.userService.getUsers(input);
	}

	@Mutation(() => User)
	removeUser(@Arg("input") input: UserIdInput) {
		return this.userService.removeUser(input);
	}

	@Mutation(() => User)
	restoreUser(@Arg("input") input: UserIdInput) {
		return this.userService.restoreUser(input);
	}

	@Query(() => User)
	deleteUser(@Arg("input") input: UserIdInput) {
		return this.userService.deleteUser(input);
	}
}
