import { GraphQLYogaError } from "@graphql-yoga/node";
import { v4 } from "uuid";

export const Query = {
  comments(parent, args, context, info) {
    const { comments } = context.db;
    return comments;
  },
};

export const Mutation = {
  createComment(parent, args, ctx, info) {
    const { pubSub, db } = ctx;
    const { post, user, body } = args.data;
    const userExist = db.users.some((u) => u.id === user);
    const postExist = db.posts.some((p) => p.id === post);

    if (!userExist || !postExist) {
      throw new GraphQLYogaError("unable to find user and post");
    }

    const comment = {
      id: v4(),
      post,
      user,
      body,
    };
    db.comments.push(comment);
    pubSub.publish(`comment ${post}`, { comment });
    return comment;
  },
};

export const Subscription = {
  comment: {
    subscribe(parent, args, ctx, info) {
      const { pubSub, db } = ctx;
      const { postId } = args;

      const post = db.posts.find((post) => post.id === postId);

      if (!post) {
        throw new GraphQLYogaError("Post not found!");
      }
      return pubSub.subscribe(`comment ${postId}`);
    },
  },
};

export const Comment = {
  post(parent, args, context, info) {
    const { posts } = context.db;
    const p = posts.find((post) => post.id === parent.post);
    return p;
  },
  user(parent, args, context, info) {
    const { users } = context.db;
    const p = users.find((user) => user.id === parent.user);
    return p;
  },
};
