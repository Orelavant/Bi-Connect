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

interface CreatePostDialogProps {
  boardName: string;
}

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

  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const handleTitleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(e.target.value);
  };

  const handleDescriptionInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionInputValue(e.target.value);
  };

  useEffect(() => {
    const validInputs = !!titleInputValue && !!descriptionInputValue;
    setCanSubmit(validInputs);
  }, [titleInputValue, descriptionInputValue]);

  // console.log(data?.isAdminLoggedIn?.username);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutate({
      input: {
        title: titleInputValue,
        content: descriptionInputValue,
      },
      boardDetails: {
        name: props.boardName,
      },
      creatorDetails: {
        username: "john",
        email: "john@haverford.edu",
      },
    });
    if (isError) {
      console.log(error);
      e.preventDefault();
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setTitleInputValue("");
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
                label="Title"
                placeholder="Put your title here:"
                onChange={handleTitleInputOnChange}
              />
              <CustomInput
                label="Description"
                placeholder="and the description here!"
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
