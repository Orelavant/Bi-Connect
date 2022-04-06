import * as Dialog from "@radix-ui/react-dialog";
import CreateButton from "./CreateButton";
import styles from "../styles/Modal.module.scss";
import { useRef } from "react";
interface CreateUserDialogProps {}

const CreateUserDialog = (props: CreateUserDialogProps) => {
	const emailInputRef = useRef<HTMLInputElement>(null);
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		const email = emailInputRef?.current?.value;
		const username = usernameInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;
		console.log(email, username, password);
	};

	return (
		<Dialog.Root modal={false}>
			<Dialog.Trigger asChild>
				<CreateButton buttonName="Create User" onClick={() => {}} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles["modal-overlay"]} />
				<Dialog.Content className={styles["content-container"]}>
					<div className={styles["content"]}>
						<div className={styles["create-user-modal-content"]}>
							<label>Email</label>
							<input ref={emailInputRef} />
							<label>Username</label>
							<input ref={usernameInputRef} />
							<label>Password</label>
							<input ref={passwordInputRef} />
							<Dialog.Close asChild>
								<button
									className={styles["modal-submit-button"]}
									onClick={handleSubmit}
								>
									Submit
								</button>
							</Dialog.Close>
						</div>
						<Dialog.Close asChild>
							<button className={styles["modal-close-button"]}>X</button>
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
