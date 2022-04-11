import React from "react";
import { useGetPostQuery } from "../../../../generated/graphql";
import PostItem from "../../../../components/PostItem";
import styles from "../../../../styles/PostComment.module.scss";
import CommentThread from "../../../../components/CommentThread";
interface PostProps {
  postid: string;
}
const endpoint = "http://localhost:3001/graphql";

const Post = (props: PostProps) => {
  const {
    isLoading: isPostLoading,
    isError: isPostError,
    data: postData,
    error: postError,
    isSuccess: isPostSuccess,
  } = useGetPostQuery(
    {
      endpoint,
      fetchParams: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    },
    { input: { _id: props.postid } }
  );

  return (
    <div className={styles["post-comment-container"]}>
      <div className={styles["post-container"]}>
        <PostItem
          creatorName={
            !isPostLoading && isPostSuccess
              ? postData.getPost.creatorName
              : null
          }
          title={
            !isPostLoading && isPostSuccess ? postData.getPost.title : null
          }
          content={
            !isPostLoading && isPostSuccess ? postData.getPost.content : null
          }
          createdAt={
            !isPostLoading && isPostSuccess ? postData.getPost.createdAt : null
          }
          likes={
            !isPostLoading && isPostSuccess ? postData.getPost.likes : null
          }
          dislikes={
            !isPostLoading && isPostSuccess ? postData.getPost.dislikes : null
          }
        />
      </div>
      <div className={styles["comment-container"]}>
        <CommentThread></CommentThread>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const pid = query.postId;
  return { props: { postid: pid } };
}

export default Post;
