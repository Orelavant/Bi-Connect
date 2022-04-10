import * as Dialog from "@radix-ui/react-dialog";
import CreateButton from "./CreateButton";
import {
	useCreatePostMutation,
	useIsAdminLoggedInQuery,
} from "../generated/graphql";
import { useEffect, useState } from "react";
import modalStyles from "../styles/Dialog.module.scss";
import CustomInput from "./CustomInput";
import styles from "../styles/CreateBoardModal.module.scss";
interface CreatePostDialogProps {}
const endpoint = "http://localhost:3001/graphql";

const CreatePostDialog = (props: CreatePostDialogProps) => {
	const { mutate, isSuccess, isError, isLoading, error } =
		useCreatePostMutation({
			endpoint,
			fetchParams: {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		});

	const {
		data,
		isSuccess: isLoggedInIsSucess,
		isError: isLoggedInIsError,
		isLoading: isLoggedInIsLoading,
		error: isLoggedInError,
	} = useIsAdminLoggedInQuery({
		endpoint,
		fetchParams: {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			credentials: "include",
		},
	});

	const [nameInputValue, setNameInputValue] = useState("");
	const [descriptionInputValue, setDescriptionInputValue] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);

	const handleNameInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameInputValue(e.target.value);
	};

	const handleDescriptionInputOnChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setDescriptionInputValue(e.target.value);
	};

	useEffect(() => {
		const validInputs = !!nameInputValue && !!descriptionInputValue;
		setCanSubmit(validInputs);
	}, [nameInputValue, descriptionInputValue]);

	// console.log(data?.isAdminLoggedIn?.username);
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		mutate({
			input: {
				title: nameInputValue,
				content: descriptionInputValue,
			},
            boardDetails: {
                name: "haverford-2022"
            },
			creatorDetails: {
				username: data?.isAdminLoggedIn?.username,
			},
		});
		if (isError) {
			console.log(error);
			e.preventDefault();
		}
	};

	const onOpenChange = (open: boolean) => {
		if (open) {
			setNameInputValue("");
			setDescriptionInputValue("");
		}
	};

	return (
		<Dialog.Root modal={false} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>
				<CreateButton buttonName="Create Post" onClick={() => {}} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={modalStyles["modal-overlay"]} />
				<Dialog.Content className={modalStyles["modal-container"]}>
					<div className={modalStyles["content"]}>
						<div className={styles["create-board-modal-content"]}>
							<CustomInput
								label="Name"
								placeholder="Haverford Confessions"
								onChange={handleNameInputOnChange}
							/>
							<CustomInput
								label="Description"
								placeholder="This is the page description for Haverford Confessions."
								onChange={handleDescriptionInputOnChange}
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

export default CreatePostDialog;