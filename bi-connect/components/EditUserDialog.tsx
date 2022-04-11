import * as Dialog from "@radix-ui/react-dialog";
import modalStyles from "../styles/Dialog.module.scss";
import styles from "../styles/EditUserModal.module.scss";
import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { useUpdateUserMutation } from "../generated/graphql";
import { MdModeEditOutline } from "react-icons/md";
import Switch from "react-switch";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

interface EditUserDialogProps {
	username: string;
	admin: boolean;
	removed: boolean;
}

const endpoint = "http://localhost:3001/graphql";
const EditUserDialog = ({ username, admin, removed }: EditUserDialogProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { mutate, isSuccess, isError, isLoading, error, data } =
		useUpdateUserMutation(
			{
				endpoint,
				fetchParams: {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				},
			},
			{
				onSuccess: async (data) => {
					const { _id } = data.updateUser;
					await queryClient.invalidateQueries(`user-${_id}`);
					queryClient.setQueryData(`user-${_id}`, data.updateUser);
				},
			}
		);

	const [usernameInputValue, setUsernameInputValue] = useState(username);
	const [isAdmin, setIsAdmin] = useState(admin);
	const [isRemoved, setRemoved] = useState(removed);
	const [canSubmit, setCanSubmit] = useState(false);

	const handleUsernameInputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUsernameInputValue(e.target.value);
	};

	const handleAdminSwitchOnChange = () => {
		setIsAdmin((isAdmin) => !isAdmin);
	};

	const handleRemovedSwitchOnChange = () => {
		setRemoved((removed) => !removed);
	};

	useEffect(() => {
		const validInputs = !!usernameInputValue;
		setCanSubmit(validInputs);
	}, [usernameInputValue]);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		mutate({
			userDetails: {
				username,
			},
			input: {
				username: usernameInputValue,
				admin: isAdmin,
				removed: isRemoved,
			},
		});
		if (isError) {
			e.preventDefault();
		}
	};

	return (
		<Dialog.Root modal={false}>
			<Dialog.Trigger asChild>
				<button className={styles["edit-button"]} title="Edit User">
					<MdModeEditOutline className={styles["edit-button-icon"]} />
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={modalStyles["modal-overlay"]} />
				<Dialog.Content className={modalStyles["modal-container"]}>
					<div className={modalStyles["content"]}>
						<div className={styles["edit-user-modal-content"]}>
							<CustomInput
								label="Username"
								value={usernameInputValue}
								placeholder="Sam"
								onChange={handleUsernameInputOnChange}
							/>
							<label>Admin</label>
							<Switch onChange={handleAdminSwitchOnChange} checked={isAdmin} />
							<label>Removed</label>
							<Switch
								onChange={handleRemovedSwitchOnChange}
								checked={isRemoved}
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

export default EditUserDialog;
