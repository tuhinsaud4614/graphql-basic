import * as data from "../demo-data";

let users = [...data.users];
let comments = [...data.comments];
let posts = [...data.posts];

const Query = {
  comments() {
    return comments;
  },
};

const Comment = {
  post(parent, args, context, info) {
    const p = posts.find((post) => post.id === parent.post);
    return p;
  },
  user(parent, args, context, info) {
    const p = users.find((user) => user.id === parent.user);
    return p;
  },
};

module.exports = { Query, Comment };
