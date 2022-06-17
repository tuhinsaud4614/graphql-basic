import * as data from "../demo-data";

let users = [...data.users];
let comments = [...data.comments];
let posts = [...data.posts];

const Query = {
  hello: () => "Hello world",
  name: () => "tuhin",
  greeting: (parent, args, context, info) => {
    console.log(context.req.headers);
    return `Hello ${args.name}`;
  },
  me: () => users[0],
  users: () => users,
};

const Mutation = {
  createUser(parent, args, context, info) {
    const { name, username, email } = args.data;
    if (
      users.some((user) => user.email === email || user.username === username)
    ) {
      throw new Error("Email or username already token");
    }

    const newUser = {
      id: randomBytes(4).toString("base64"),
      name,
      email,
      username,
      posts: [],
      comments: [],
    };
    users.push(newUser);
    return newUser;
  },

  deleteUser(parent, args, context, info) {
    const { id } = args;
    const isUserExist = users.findIndex((user) => user.id === id);

    if (isUserExist === -1) {
      throw new Error("User not exist");
    }

    const deletedUsers = users.splice(isUserExist, 1);

    posts = posts.filter((post) => {
      const match = post.creator === id;

      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }

      return !match;
    });

    comments = comments.filter((comment) => comment.user !== id);

    return deletedUsers[0];
  },
};

const User = {
  posts(parent, args, context, info) {
    const ps = posts.filter((post) => post.creator === parent.id);
    return ps;
  },
  comments(parent, args, context, info) {
    const cs = comments.filter((comment) => comment.user === parent.id);
    return cs;
  },
};

module.exports = { Query, Mutation, User };
