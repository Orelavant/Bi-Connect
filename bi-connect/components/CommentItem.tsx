import React from "react";
import styles from "../styles/";

interface CommentProps {
  username: string;
  content: string;
}

const CommentItem = (props: CommentProps) => {
  return <div className={styles["comment-container"]}></div>;
};

export default CommentItem;
