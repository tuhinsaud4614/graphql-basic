import * as data from "../demo-data";

let users = [...data.users];
let comments = [...data.comments];
let posts = [...data.posts];

const Query = {
  post() {
    return posts[0];
  },
  posts() {
    return posts;
  },
};

const Mutation = {
  createPost(parent, args, context, info) {
    const { creator, title, body } = args.data;
    const isUserExist = users.some((user) => user.id === creator);

    if (!isUserExist) {
      throw new Error("User not found");
    }

    const newPost = {
      id: randomBytes(4).toString("base64"),
      title,
      body,
      creator,
      comments: [],
    };
    posts.push(newPost);
    return newPost;
  },
};

const Post = {
  creator(parent, args, context, info) {
    const user = users.find((user) => user.id === parent.creator);
    return user;
  },
  comments(parent, args, context, info) {
    const c = comments.filter((comment) => comment.post === parent.id);
    return c;
  },
};

module.exports = { Query, Mutation, Post };
