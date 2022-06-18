export const Query = {
  comments(parent, args, context, info) {
    const { comments } = context.db;
    return comments;
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
