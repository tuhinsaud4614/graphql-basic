import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query = {
  async post(parent, args, context, info) {
    const { prisma } = context;
    const { id } = args;
    if (isNaN(+id)) {
      return new GraphQLYogaError("Enter a valid post id.");
    }

    try {
      const post = await prisma.post.findFirst({ where: { id: id } });
      if (!post) {
        return new GraphQLYogaError("Post not exist.");
      }

      return post;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
  async posts(parent, args, context, info) {
    const { prisma } = context;
    try {
      const posts = await prisma.post.findMany();
      if (!posts || posts.length === 0) {
        return new GraphQLYogaError("User not found");
      }
      return posts;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};

export const Mutation = {
  async createPost(parent, args, context, info) {
    const { author, title, body } = args.data;
    const { prisma } = context;

    if (isNaN(+author)) {
      return new GraphQLYogaError("Enter a valid author id.");
    }
    try {
      const user = await prisma.user.findFirst({ where: { id: +author } });

      if (!user) {
        return new GraphQLYogaError("Author not exist!");
      }

      const newPost = await prisma.post.create({
        data: { title, body, published: false, authorId: +author },
      });
      return newPost;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};

export const Post = {
  async author(parent, args, context, info) {
    const { prisma } = context;
    try {
      const user = await prisma.user.findFirst({
        where: { id: parent.authorId },
      });
      if (!user) {
        return new GraphQLYogaError("User not found for the post");
      }
      return user;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};
