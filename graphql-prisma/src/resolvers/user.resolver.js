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

  async deleteUser(parent, args, ctx, info) {
    try {
      const { id } = args;
      const { prisma } = ctx;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (!user) {
        return new GraphQLYogaError("User not exist!");
      }

      const deletedUser = await prisma.user.delete({ where: { id } });
      return id;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },

  async updateUser(parent, args, ctx, info) {
    try {
      const { id, name, email } = args.data;
      const { prisma } = ctx;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (!user) {
        return new GraphQLYogaError("User not exist!");
      }

      if (!name && !email) {
        return user;
      }

      if (email) {
        const isEmailToken = await prisma.user.findFirst({
          where: { email: email },
        });
        if (isEmailToken) {
          return new GraphQLYogaError("User already exist");
        }
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name: name ?? user.name,
          email: email ?? user.email,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },
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
