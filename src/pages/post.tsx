import { PostByIdRoute } from "@/routes/posts-route";

const Post = () => {

  const post = PostByIdRoute.useLoaderData()
  return (
    <div>
      {post.body}
    </div>
  )
};

export default Post