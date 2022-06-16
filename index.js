import { createServer } from "@graphql-yoga/node";

const users = [
  {
    id: "1",
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    posts: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    posts: ["4", "5", "6"],
  },
  {
    id: "3",
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    posts: ["7", "8", "9"],
  },
  {
    id: "4",
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    posts: ["10"],
  },
  {
    id: "5",
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    posts: [],
  },
  {
    id: "6",
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    posts: [],
  },
  {
    id: "7",
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    posts: [],
  },
  {
    id: "8",
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    posts: [],
  },
  {
    id: "9",
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    posts: [],
  },
  {
    id: "10",
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    posts: [],
  },
];
const posts = [
  {
    creator: "1",
    id: "1",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    creator: "1",
    id: "2",
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    creator: "1",
    id: "3",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    creator: "2",
    id: "4",
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    creator: "2",
    id: "5",
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    creator: "2",
    id: "6",
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    creator: "3",
    id: "7",
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    creator: "3",
    id: "8",
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    creator: "3",
    id: "9",
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    creator: "4",
    id: "10",
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
];

const typeDefs = `
    type Query {
        hello: String
        name: String!
        greeting(name: String!): String!
        me: User!
        users: [User!]!
        post: Post!
        posts: [Post!]!
    }

    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        posts: [Post!]! 
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        creator: User!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world",
    name: () => "tuhin",
    greeting: (parent, args, context, info) => {
      console.log(context.req.headers);
      return `Hello ${args.name}`;
    },
    me: () => users[0],
    users: () => users,
    post() {
      return posts[0];
    },
    posts() {
      return posts;
    },
  },
  Post: {
    creator(parent, args, context, info) {
      const user = users.find((user) => user.id === parent.creator);

      return user;
    },
  },
  User: {
    posts(parent, args, context, info) {
      const ps = posts.filter((post) => post.creator === parent.id);
      return ps;
    },
  },
};

const server = createServer({
  schema: {
    typeDefs: typeDefs,
    resolvers: resolvers,
  },
});

(async () => {
  await server.start();
})();
