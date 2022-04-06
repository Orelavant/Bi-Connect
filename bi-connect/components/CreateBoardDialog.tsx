import * as Dialog from "@radix-ui/react-dialog";
import CreateButton from "./CreateButton";

interface CreateBoardDialogProps {}

const CreateBoardDialog = (props: CreateBoardDialogProps) => {
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<CreateButton buttonName="Create Board" onClick={() => {}} />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title />
					<Dialog.Description />
					<Dialog.Close />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default CreateBoardDialog;
