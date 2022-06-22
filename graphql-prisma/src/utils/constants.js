// Subscription Operations Name generators
export function SUBSCRIPTION_FOR_POST_ON_COMMENT(postId) {
  return `COMMENT_ON_${postId}`;
}

export const IMAGE_MIMES = {
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
