import { v4 as uuidV4 } from "uuid";

export const Query = {
  hello: () => "Hello world",
  name: () => "tuhin",
  greeting: (parent, args, context, info) => {
    return `Hello ${args.name}`;
  },
  me: (parent, args, context, info) => {
    const { users } = context.db;
    return users[0];
  },
  users: (parent, args, context, info) => {
    const { users } = context.db;
    return users;
  },
};

export const Mutation = {
  createUser(parent, args, context, info) {
    const { name, username, email } = args.data;
    const { users } = context.db;
    if (
      users.some((user) => user.email === email || user.username === username)
    ) {
      throw new Error("Email or username already token");
    }

    const newUser = {
      id: uuidV4(),
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
    const { users, posts, comments } = context.db;
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

  updateUser(parent, args, context, info) {
    const {
      id,
      data: { name, username, email },
    } = args;
    const { users } = context.db;

    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not exist");
    }

    if (email) {
      const emailTaken = users.some((user) => user.email === email);
      if (emailTaken) {
        throw new Error("Email already taken");
      }
      user.email = email;
    }

    if (username) {
      const usernameTaken = users.some((user) => user.username === username);
      if (usernameTaken) {
        throw new Error("Username already taken");
      }
      user.username = username;
    }

    if (name) {
      user.name = name;
    }
    return user;
  },
};

export const User = {
  posts(parent, args, context, info) {
    const { posts } = context.db;
    const ps = posts.filter((post) => post.creator === parent.id);
    return ps;
  },
  comments(parent, args, context, info) {
    const { comments } = context.db;
    const cs = comments.filter((comment) => comment.user === parent.id);
    return cs;
  },
};
