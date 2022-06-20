import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query = {
  async post(parent, args, context, info) {
    const { prisma } = context;
    const { id } = args;

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

    try {
      const user = await prisma.user.findFirst({ where: { id: author } });

      if (!user) {
        return new GraphQLYogaError("Author not exist!");
      }

      const newPost = await prisma.post.create({
        data: { title, body, published: false, authorId: author },
      });

      return newPost;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },

  async deletePost(parent, args, ctx, info) {
    try {
      const { id } = args;
      const { prisma } = ctx;

      const post = await prisma.post.findFirst({
        where: { id },
      });

      if (!post) {
        return new GraphQLYogaError("Post not exist!");
      }

      const deletedPost = await prisma.post.delete({ where: { id } });
      return id;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },

  async updatePost(parent, args, ctx, info) {
    try {
      const { id, title, body, published } = args.data;
      const { prisma } = ctx;

      const post = await prisma.post.findFirst({
        where: { id },
      });

      if (!post) {
        return new GraphQLYogaError("Post not exist!");
      }

      if (!title && !body && published === undefined) {
        return post;
      }

      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title: title || post.title,
          body: body || post.body,
          published: published ?? post.published,
        },
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
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

  async comments(parent, args, context, info) {
    const { prisma } = context;
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: parent.id },
      });

      return comments;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};
