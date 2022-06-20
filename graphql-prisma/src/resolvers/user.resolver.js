import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query = {
  user: async (parent, args, context, info) => {
    const { prisma } = context;
    try {
      const user = await prisma.user.findFirst();
      if (!user) {
        throw new GraphQLYogaError("User not found");
      }

      return user;
    } catch (error) {
      throw new GraphQLYogaError("User not found");
    }
  },
  users: async (parent, args, context, info) => {
    const { prisma } = context;
    try {
      const users = await prisma.user.findMany();
      if (!users || users.length === 0) {
        return new GraphQLYogaError("User not found");
      }

      return users;
    } catch (error) {
      throw new GraphQLYogaError("Users not found");
    }
  },
};

export const Mutation = {
  async createUser(parent, args, context, info) {
    const { name, email } = args.data;
    const { prisma } = context;
    try {
      const isExist = await prisma.user.findFirst({ where: { email: email } });
      if (isExist) {
        return new GraphQLYogaError("User already exist");
      }
      const newUser = await prisma.user.create({
        data: { email, name },
      });

      return newUser;
    } catch (error) {
      throw new GraphQLYogaError("User creation failed", error);
    }
  },

  // deleteUser(parent, args, context, info) {
  //   const { id } = args;
  //   const { users, posts, comments } = context.db;
  //   const isUserExist = users.findIndex((user) => user.id === id);

  //   if (isUserExist === -1) {
  //     throw new Error("User not exist");
  //   }

  //   const deletedUsers = users.splice(isUserExist, 1);

  //   posts = posts.filter((post) => {
  //     const match = post.creator === id;

  //     if (match) {
  //       comments = comments.filter((comment) => comment.post !== post.id);
  //     }

  //     return !match;
  //   });

  //   comments = comments.filter((comment) => comment.user !== id);

  //   return deletedUsers[0];
  // },

  // updateUser(parent, args, context, info) {
  //   const {
  //     id,
  //     data: { name, username, email },
  //   } = args;
  //   const { users } = context.db;

  //   const user = users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new Error("User not exist");
  //   }

  //   if (email) {
  //     const emailTaken = users.some((user) => user.email === email);
  //     if (emailTaken) {
  //       throw new Error("Email already taken");
  //     }
  //     user.email = email;
  //   }

  //   if (username) {
  //     const usernameTaken = users.some((user) => user.username === username);
  //     if (usernameTaken) {
  //       throw new Error("Username already taken");
  //     }
  //     user.username = username;
  //   }

  //   if (name) {
  //     user.name = name;
  //   }
  //   return user;
  // },
};

export const User = {
  async posts(parent, args, context, info) {
    try {
      const { prisma } = context;
      const posts = await prisma.post.findMany({
        where: { authorId: parent.id },
      });
      return posts;
    } catch (error) {
      return new GraphQLYogaError("Posts not found for the user");
    }
  },
  async comments(parent, args, context, info) {
    try {
      const { prisma } = context;
      const comments = await prisma.comment.findMany({
        where: { authorId: parent.id },
      });
      return comments;
    } catch (error) {
      return new GraphQLYogaError("Comments not found for the user");
    }
  },
};
