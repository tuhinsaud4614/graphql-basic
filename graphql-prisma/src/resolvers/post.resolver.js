import { GraphQLYogaError } from "@graphql-yoga/node";
import path from "path";
import { v4 } from "uuid";
import { AsyncImageSize, fileUpload, IMAGE_MIMES, maxFileSize } from "../utils";

function filterFunction(newFile, cb) {
  const { type, size } = newFile;
  if (!Object.prototype.hasOwnProperty.call(IMAGE_MIMES, type)) {
    return cb(new GraphQLYogaError("File should be image"));
  }

  if (size > maxFileSize(5)) {
    return cb(new GraphQLYogaError("File size should be less than 5 Mb"));
  }

  cb(null, true);
}

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
    const dest = path.join(process.cwd(), "images");
    const { author, title, body, file1, file2 } = args.data;
    const { prisma } = context;

    const imagesPath = [];

    try {
      const user = await prisma.user.findFirst({ where: { id: author } });

      if (!user) {
        return new GraphQLYogaError("Author not exist!");
      }

      const { name: name1, filePath: filePath1 } = await fileUpload(file1, {
        dest: dest,
        name: v4(),
        filterFunction: filterFunction,
      });
      imagesPath.push(filePath1);
      const dimensions1 = await AsyncImageSize(filePath1);

      let name2, filePath2, dimensions2;
      if (file2 !== null) {
        const { name, filePath } = await fileUpload(file2, {
          dest: dest,
          name: v4(),
          filterFunction: filterFunction,
        });
        name2 = name;
        filePath2 = filePath;
        imagesPath.push(filePath);
        dimensions2 = await AsyncImageSize(filePath2);
      }

      const newPost = await prisma.$transaction(async (prisma) => {
        const images = [
          {
            url: "images/" + name1,
            width: dimensions1?.width || 200,
            height: dimensions1?.height || 200,
          },
        ];

        if (name2) {
          images.push({
            url: "images/" + name2,
            width: dimensions2.width || 200,
            height: dimensions2.height || 200,
          });
        }

        const post = await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            authorId: author,
            images: { create: images },
          },
        });

        return post;
      });

      return newPost;
    } catch (error) {
      imagesPath.forEach((imagePath) => {
        unlink(imagePath, (linkErr) => {
          if (linkErr) {
            console.error(linkErr?.message);
          }
        });
      });
      return new GraphQLYogaError(error);
    }
  },
  // async uploadImages(parent, args, ctx, info) {
  //   try {
  //     const uId = v4();
  //     const dest = path.join(process.cwd(), "images");
  //     const { id, file1, file2 } = args;
  //     console.log(file1.size, file2.size);
  //     const { prisma } = ctx;

  //     // console.log(files);

  //     const isPostExit = await prisma.post.findFirst({
  //       where: { id },
  //     });

  //     if (!isPostExit) {
  //       return new GraphQLYogaError("User not exist!");
  //     }

  //     // const user = await prisma.$transaction(async (prisma) => {
  //     //   const { name, filePath } = await fileUpload(file, {
  //     //     dest: dest,
  //     //     name: uId,
  //     //     filterFunction(newFile, cb) {
  //     //       const { type, size } = newFile;
  //     //       if (!Object.prototype.hasOwnProperty.call(IMAGE_MIMES, type)) {
  //     //         return cb(new GraphQLYogaError("File should be image"));
  //     //       }

  //     //       if (size > maxFileSize(5)) {
  //     //         return cb(
  //     //           new GraphQLYogaError("File size should be less than 5 Mb")
  //     //         );
  //     //       }

  //     //       cb(null, true);
  //     //     },
  //     //   });

  //     //   const dimensions = await AsyncImageSize(filePath);

  //     //   const avatar = await prisma.picture.create({
  //     //     data: {
  //     //       url: "images/" + name,
  //     //       width: dimensions?.width || 200,
  //     //       height: dimensions?.height || 200,
  //     //     },
  //     //   });

  //     //   const user = await prisma.user.update({
  //     //     where: { id: id },
  //     //     data: { avatarId: avatar.id },
  //     //   });

  //     //   return user;
  //     // });
  //     // prisma.picture
  //     //   .delete({ where: { id: isUserExit.avatarId } })
  //     //   .then((oldPicture) => {
  //     //     unlink(oldPicture.url, (linkErr) => {
  //     //       if (linkErr) {
  //     //         console.error(linkErr?.message);
  //     //       }
  //     //     });
  //     //   });

  //     return isPostExit;
  //   } catch (error) {
  //     console.log(error);
  //     return new GraphQLYogaError(error);
  //   }
  // },

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

  async images(parent, args, context, info) {
    try {
      const { prisma } = context;
      const images = await prisma.picture.findMany({
        where: { postId: parent.id },
      });
      return images;
    } catch (error) {
      return new GraphQLYogaError("Comments not found for the user");
    }
  },
};
