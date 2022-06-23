import { GraphQLYogaError } from '@graphql-yoga/node';
import { SUBSCRIPTION_FOR_POST_ON_COMMENT } from '../utils';

export const Query = {
  async comment(parent, args, context, info) {
    const { prisma } = context;
    const { id } = args;

    try {
      const comment = await prisma.comment.findFirst({ where: { id } });
      if (!comment) {
        return new GraphQLYogaError('Comment not found');
      }
      return comment;
    } catch (error) {
      return new GraphQLYogaError('Comment not found');
    }
  },
  async comments(parent, args, context, info) {
    const { prisma } = context;
    try {
      const comments = await prisma.comment.findMany();
      return comments;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  }
};

export const Mutation = {
  async createComment(parent, args, ctx, info) {
    try {
      const { text, author, post } = args.data;
      const { prisma, pubSub } = ctx;

      const isUser = await prisma.user.findFirst({ where: { id: author } });
      const isPost = await prisma.post.findFirst({ where: { id: post } });
      if (!isUser || !isPost) {
        return new GraphQLYogaError('Author or Post not exist!');
      }

      const newComment = await prisma.comment.create({
        data: { text, authorId: author, postId: post }
      });
      pubSub.publish(SUBSCRIPTION_FOR_POST_ON_COMMENT(post), {
        comment: {
          mutation: 'CREATED',
          data: newComment
        }
      });
      return newComment;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },

  async deleteComment(parent, args, ctx, info) {
    try {
      const { id } = args;
      const { prisma, pubSub } = ctx;

      const comment = await prisma.comment.findFirst({
        where: { id }
      });

      if (!comment) {
        return new GraphQLYogaError('Comment not exist!');
      }

      const deletedComment = await prisma.comment.delete({ where: { id } });

      pubSub.publish(SUBSCRIPTION_FOR_POST_ON_COMMENT(comment.postId), {
        comment: {
          mutation: 'DELETED',
          data: deletedComment
        }
      });
      return id;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },

  async updateComment(parent, args, ctx, info) {
    try {
      const { id, text } = args.data;
      const { prisma, pubSub } = ctx;

      const comment = await prisma.comment.findFirst({
        where: { id }
      });

      if (!comment) {
        return new GraphQLYogaError('Comment not exist!');
      }

      if (!text) {
        return comment;
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: {
          text
        }
      });

      pubSub.publish(SUBSCRIPTION_FOR_POST_ON_COMMENT(updatedComment.postId), {
        comment: {
          mutation: 'UPDATED',
          data: updatedComment
        }
      });
      return updatedComment;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  }
};

export const Subscription = {
  comment: {
    async subscribe(parent, args, ctx, info) {
      try {
        const { pubSub, prisma } = ctx;
        const { postId } = args;
        const post = await prisma.post.findFirst({ where: { id: postId } });

        if (!post) {
          return new GraphQLYogaError('Post not found for the comment!');
        }
        return pubSub.subscribe(SUBSCRIPTION_FOR_POST_ON_COMMENT(postId));
      } catch (error) {
        console.log(error);
        return new GraphQLYogaError(error);
      }
    }
  }
};

export const Comment = {
  async author(parent, args, context, info) {
    const { prisma } = context;
    try {
      const user = await prisma.user.findFirst({
        where: { id: parent.authorId }
      });
      if (!user) {
        return new GraphQLYogaError('User not found for the comment');
      }
      return user;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
  async post(parent, args, context, info) {
    const { prisma } = context;
    try {
      const post = await prisma.post.findFirst({
        where: { id: parent.postId }
      });
      if (!post) {
        return new GraphQLYogaError('Post not found for the comment');
      }
      return post;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  }
};
