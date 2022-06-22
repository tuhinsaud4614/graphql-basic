export const yupValidation = {
  async Mutation(resolve, root, args, context, info) {
    console.log("yupValidation.Mutation -> before", args);
    const result = await resolve(root, args, context, info);
    console.log("yupValidation.Mutation -> after", result);
    return result;
  },
};
