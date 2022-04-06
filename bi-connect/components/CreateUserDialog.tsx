import * as Dialog from "@radix-ui/react-dialog";
import CreateButton from "./CreateButton";
import modalStyles from "../styles/Dialog.module.scss";
import styles from "../styles/CreateUserModal.module.scss";
import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { useCreateUserMutation } from "../generated/graphql";
interface CreateUserDialogProps {}

const endpoint = "http://localhost:3001/graphql";
const CreateUserDialog = (props: CreateUserDialogProps) => {
	const { mutate, isSuccess, isError, isLoading, error } =
		useCreateUserMutation({
			endpoint,
			fetchParams: {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		});

	const [emailInputValue, setEmailInputValue] = useState("");
	const [usernameInputValue, setUsernameInputValue] = useState("");
	const [passwordInputValue, setPasswordInputValue] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);

	const handleEmailInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInputValue(e.target.value);
	};

	const handleUsernameInputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUsernameInputValue(e.target.value);
	};

	const handlePasswordInputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setPasswordInputValue(e.target.value);
	};

	useEffect(() => {
		const validInputs =
			!!emailInputValue && !!usernameInputValue && !!passwordInputValue;
		setCanSubmit(validInputs);
	}, [emailInputValue, usernameInputValue, passwordInputValue]);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		mutate({
			input: {
				email: emailInputValue,
				username: usernameInputValue,
				password: passwordInputValue,
			},
		});
		if (isError) {
			e.preventDefault();
		}
	};

	const onOpenChange = (open: boolean) => {
		if (open) {
			setEmailInputValue("");
			setUsernameInputValue("");
			setPasswordInputValue("");
		}
	};

	return (
		<Dialog.Root modal={false} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>
				<CreateButton buttonName="Create User" onClick={() => {}} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={modalStyles["modal-overlay"]} />
				<Dialog.Content className={modalStyles["modal-container"]}>
					<div className={modalStyles["content"]}>
						<div className={styles["create-user-modal-content"]}>
							<CustomInput
								label="Email"
								placeholder="sam@gmail.com"
								onChange={handleEmailInputOnChange}
							/>
							<CustomInput
								label="Username"
								placeholder="Sam"
								onChange={handleUsernameInputOnChange}
							/>
							<CustomInput
								label="Password"
								type="password"
								onChange={handlePasswordInputOnChange}
							/>
							<Dialog.Close asChild>
								<button
									disabled={!canSubmit}
									className={modalStyles["modal-submit-button"]}
									onClick={handleSubmit}
								>
									Submit
								</button>
							</Dialog.Close>
						</div>
						<Dialog.Close asChild>
							<button className={modalStyles["modal-close-button"]}>X</button>
						</Dialog.Close>
					</div>
					<Dialog.Title />
					<Dialog.Description />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default CreateUserDialog;
