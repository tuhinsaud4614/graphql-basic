import { v4 as uuid } from "uuid";
export const Query = {
  post(parent, args, context, info) {
    const { posts } = context.db;
    return posts[0];
  },
  posts(parent, args, context, info) {
    const { posts } = context.db;
    return posts;
  },
};

export const Mutation = {
  createPost(parent, args, context, info) {
    const { creator, title, body } = args.data;
    const { users, posts } = context.db;
    const isUserExist = users.some((user) => user.id === creator);

    if (!isUserExist) {
      throw new Error("User not found");
    }

    const newPost = {
      id: uuid(),
      title,
      body,
      creator,
      comments: [],
    };
    posts.push(newPost);
    return newPost;
  },
};

export const Post = {
  creator(parent, args, context, info) {
    const { users } = context.db;
    const user = users.find((user) => user.id === parent.creator);
    return user;
  },
  comments(parent, args, context, info) {
    const { comments } = context.db;
    const c = comments.filter((comment) => comment.post === parent.id);
    return c;
  },
};
