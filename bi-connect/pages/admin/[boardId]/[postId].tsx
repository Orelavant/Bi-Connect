import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Post = ({ test }: any) => {
  const router = useRouter();
  console.log(test);
  return <div>post id: {test}</div>;
};

export async function getServerSideProps({ query }: any) {
  const pid = query.postId;
  return { props: { test: pid } };
}

export default Post;
