import {
  useCreateCommentMutation,
  useIsAdminLoggedInQuery,
} from "../generated/graphql";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Comment } from "semantic-ui-react";
const endpoint = "http://localhost:3001/graphql";

interface CreateCommentDialogProps {
  postId: string;
  parentId: string;
  callBack: any;
}

const CreateCommentDialog = (props: CreateCommentDialogProps) => {
  const { mutate, isSuccess, isError, isLoading, error } =
    useCreateCommentMutation({
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

  const [contentInputValue, setContentInputValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const handleContentInputOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContentInputValue(e.target.value);
  };

  useEffect(() => {
    const validInputs = !!contentInputValue;
    setCanSubmit(validInputs);
  }, [contentInputValue]);

  // console.log(data?.isAdminLoggedIn?.username);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutate({
      input: {
        content: contentInputValue,
        parentId: props.parentId,
      },
      postDetails: {
        _id: props.postId,
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
    props.callBack(false);
    setContentInputValue("");
  };

  return (
    <Form reply>
      <Form.TextArea
        style={{ maxHeight: 100 }}
        onChange={handleContentInputOnChange}
        value={contentInputValue}
      />
      <Button
        content="Add Reply"
        labelPosition="left"
        icon="edit"
        type="button"
        disabled={!canSubmit}
        onClick={handleSubmit}
        primary
      />
    </Form>
  );
};

export default CreateCommentDialog;
