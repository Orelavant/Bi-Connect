import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <div></div>;
};

export default Post;
