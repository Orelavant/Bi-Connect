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
import { filterAttributes } from "../utils/misc";

@Resolver()
export default class UserResolver {
	constructor(private userService: UserService) {
		this.userService = new UserService();
	}

	@Mutation(() => User)
	createUser(@Arg("input") input: CreateUserInput) {
		const cleanedInput = filterAttributes<CreateUserInput>(input, [
			null,
			undefined,
		]);
		return this.userService.createUser(cleanedInput);
	}

	@Mutation(() => User)
	updateUser(
		@Arg("userDetails") userDetails: UserIdInput,
		@Arg("input") input: UpdateUserInput
	) {
		const cleanedUserDetails = filterAttributes<UserIdInput>(userDetails, [
			null,
			undefined,
		]);
		const cleanedInput = filterAttributes<UpdateUserInput>(input, [
			null,
			undefined,
		]);
		return this.userService.updateUser(cleanedUserDetails, cleanedInput);
	}

	@Mutation(() => String)
	login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
		const cleanedInput = filterAttributes<LoginInput>(input, [null, undefined]);
		return this.userService.login(cleanedInput, context);
	}

	@Mutation(() => String)
	loginAdmin(@Arg("input") input: LoginInput, @Ctx() context: Context) {
		const cleanedInput = filterAttributes<LoginInput>(input, [null, undefined]);
		return this.userService.loginAdmin(cleanedInput, context);
	}

	@Query(() => User, { nullable: true })
	isLoggedIn(@Ctx() context: Context) {
		return context.user;
	}

	@Query(() => User, { nullable: true })
	isAdminLoggedIn(@Ctx() context: Context) {
		return context.user?.admin ? context.user : null;
	}

	@Query(() => [User!]!)
	getUsers(@Arg("input") input: GetUsersInput) {
		const cleanedInput = filterAttributes<GetUsersInput>(input, [
			null,
			undefined,
		]);
		return this.userService.getUsers(cleanedInput);
	}

	@Query(() => User)
	getUser(@Arg("input") input: UserIdInput) {
		const cleanedInput = filterAttributes<UserIdInput>(input, [
			null,
			undefined,
		]);
		return this.userService.getUser(cleanedInput);
	}

	@Mutation(() => User)
	removeUser(@Arg("input") input: UserIdInput) {
		const cleanedInput = filterAttributes<UserIdInput>(input, [
			null,
			undefined,
		]);
		return this.userService.removeUser(cleanedInput);
	}

	@Mutation(() => User)
	restoreUser(@Arg("input") input: UserIdInput) {
		const cleanedInput = filterAttributes<UserIdInput>(input, [
			null,
			undefined,
		]);
		return this.userService.restoreUser(cleanedInput);
	}

	@Query(() => User)
	deleteUser(@Arg("input") input: UserIdInput) {
		const cleanedInput = filterAttributes<UserIdInput>(input, [
			null,
			undefined,
		]);
		return this.userService.deleteUser(cleanedInput);
	}
}
