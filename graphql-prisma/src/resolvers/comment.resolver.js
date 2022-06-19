import { GraphQLYogaError } from "@graphql-yoga/node";

export const Query = {
  async comment(parent, args, context, info) {
    const { prisma } = context;
    const { id } = args;

    if (isNaN(+id)) {
      return new GraphQLYogaError("Enter a valid comment id.");
    }

    try {
      const comment = await prisma.comment.findFirst({ where: { id: +id } });
      if (!comment) {
        return new GraphQLYogaError("Comment not found");
      }
      return comment;
    } catch (error) {
      return new GraphQLYogaError("Comment not found");
    }
  },
  async comments(parent, args, context, info) {
    const { prisma } = context;
    try {
      const comments = await prisma.comments.findMany();
      if (!comments || comments.length === 0) {
        return new GraphQLYogaError("Comments not found");
      }
      return comments;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};

export const Mutation = {
  async createComment(parent, args, ctx, info) {
    try {
      const { text, author, post } = args.data;
      const { prisma } = ctx;

      if (isNaN(+author) || isNaN(+post)) {
        return new GraphQLYogaError("Enter a valid author or post id.");
      }
      const isUser = await prisma.user.findFirst({ where: { id: author } });
      const isPost = await prisma.post.findFirst({ where: { id: post } });
      if (!isUser || !isPost) {
        return new GraphQLYogaError("Author or Post not exist!");
      }

      const newComment = await prisma.comment.create({
        data: { text, authorId: author, postId: post },
      });
      return newComment;
    } catch (error) {
      console.log(error);
      return new GraphQLYogaError(error);
    }
  },
};

// export const Subscription = {
//   comment: {
//     subscribe(parent, args, ctx, info) {
//       const { pubSub, db } = ctx;
//       const { postId } = args;

//       const post = db.posts.find((post) => post.id === postId);

//       if (!post) {
//         throw new GraphQLYogaError("Post not found!");
//       }
//       return pubSub.subscribe(`comment ${postId}`);
//     },
//   },
// };

export const Comment = {
  async author(parent, args, context, info) {
    const { prisma } = context;
    try {
      const user = await prisma.user.findFirst({
        where: { id: parent.authorId },
      });
      if (!user) {
        return new GraphQLYogaError("User not found for the comment");
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
        where: { id: parent.postId },
      });
      if (!post) {
        return new GraphQLYogaError("Post not found for the comment");
      }
      return post;
    } catch (error) {
      return new GraphQLYogaError(error);
    }
  },
};
