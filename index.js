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

const comments = [
  {
    post: "1",
    id: "1",
    user: "1",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    post: "1",
    id: "2",
    user: "1",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
  {
    post: "1",
    id: " 3",
    user: "2",
    body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  {
    post: "1",
    id: " 4",
    user: "4",
    body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
  },
  {
    post: "1",
    id: " 5",
    user: "10",
    body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
  },
  {
    post: "2",
    id: " 6",
    user: "5",
    body: "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
  },
  {
    post: "2",
    id: " 7",
    user: "7",
    body: "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
  },
  {
    post: "2",
    id: " 8",
    user: "9",
    body: "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque",
  },
  {
    post: "2",
    id: " 9",
    user: "1",
    body: "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus",
  },
  {
    post: "2",
    id: "10",
    user: "10",
    body: "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis",
  },
  {
    post: "3",
    id: "11",
    user: "2",
    body: "ut dolorum nostrum id quia aut est\nfuga est inventore vel eligendi explicabo quis consectetur\naut occaecati repellat id natus quo est\nut blanditiis quia ut vel ut maiores ea",
  },
  {
    post: "3",
    id: "12",
    user: "4",
    body: "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit",
  },
  {
    post: "3",
    id: "13",
    user: "2",
    body: "fuga eos qui dolor rerum\ninventore corporis exercitationem\ncorporis cupiditate et deserunt recusandae est sed quis culpa\neum maiores corporis et",
  },
  {
    post: "3",
    id: "14",
    user: "4",
    body: "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum",
  },
  {
    post: "3",
    id: "15",
    user: "3",
    body: "nihil ut voluptates blanditiis autem odio dicta rerum\nquisquam saepe et est\nsunt quasi nemo laudantium deserunt\nmolestias tempora quo quia",
  },
  {
    post: "4",
    id: "16",
    user: "2",
    body: "iste ut laborum aliquid velit facere itaque\nquo ut soluta dicta voluptate\nerror tempore aut et\nsequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis",
  },
  {
    post: "4",
    id: "17",
    user: "2",
    body: "consequatur necessitatibus totam sed sit dolorum\nrecusandae quae odio excepturi voluptatum harum voluptas\nquisquam sit ad eveniet delectus\ndoloribus odio qui non labore",
  },
  {
    post: "4",
    id: "18",
    user: "1",
    body: "veritatis voluptates necessitatibus maiores corrupti\nneque et exercitationem amet sit et\nullam velit sit magnam laborum\nmagni ut molestias",
  },
  {
    post: "4",
    id: "19",
    user: "1",
    body: "doloribus est illo sed minima aperiam\nut dignissimos accusantium tempore atque et aut molestiae\nmagni ut accusamus voluptatem quos ut voluptates\nquisquam porro sed architecto ut",
  },
  {
    post: "4",
    id: "20",
    user: "1",
    body: "qui harum consequatur fugiat\net eligendi perferendis at molestiae commodi ducimus\ndoloremque asperiores numquam qui\nut sit dignissimos reprehenderit tempore",
  },
  {
    post: "5",
    id: "21",
    user: "1",
    body: "deleniti aut sed molestias explicabo\ncommodi odio ratione nesciunt\nvoluptate doloremque est\nnam autem error delectus",
  },
  {
    post: "5",
    id: "22",
    user: "1",
    body: "qui ipsa animi nostrum praesentium voluptatibus odit\nqui non impedit cum qui nostrum aliquid fuga explicabo\nvoluptatem fugit earum voluptas exercitationem temporibus dignissimos distinctio\nesse inventore reprehenderit quidem ut incidunt nihil necessitatibus rerum",
  },
  {
    post: "5",
    id: "23",
    user: "1",
    body: "voluptates provident repellendus iusto perspiciatis ex fugiat ut\nut dolor nam aliquid et expedita voluptate\nsunt vitae illo rerum in quos\nvel eligendi enim quae fugiat est",
  },
  {
    post: "5",
    id: "24",
    user: "1",
    body: "repudiandae repellat quia\nsequi est dolore explicabo nihil et\net sit et\net praesentium iste atque asperiores tenetur",
  },
  {
    post: "5",
    id: "25",
    user: "1",
    body: "sunt aut quae laboriosam sit ut impedit\nadipisci harum laborum totam deleniti voluptas odit rem ea\nnon iure distinctio ut velit doloribus\net non ex",
  },
  {
    post: "6",
    id: "26",
    user: "1",
    body: "incidunt sapiente eaque dolor eos\nad est molestias\nquas sit et nihil exercitationem at cumque ullam\nnihil magnam et",
  },
  {
    post: "6",
    id: "27",
    user: "1",
    body: "nisi vel quas ut laborum ratione\nrerum magni eum\nunde et voluptatem saepe\nvoluptas corporis modi amet ipsam eos saepe porro",
  },
  {
    post: "6",
    id: "28",
    user: "1",
    body: "voluptatem repellendus quo alias at laudantium\nmollitia quidem esse\ntemporibus consequuntur vitae rerum illum\nid corporis sit id",
  },
  {
    post: "6",
    id: "29",
    user: "1",
    body: "tempora voluptatem est\nmagnam distinctio autem est dolorem\net ipsa molestiae odit rerum itaque corporis nihil nam\neaque rerum error",
  },
  {
    post: "6",
    id: "30",
    user: "1",
    body: "consequuntur quia voluptate assumenda et\nautem voluptatem reiciendis ipsum animi est provident\nearum aperiam sapiente ad vitae iste\naccusantium aperiam eius qui dolore voluptatem et",
  },
  {
    post: "7",
    id: "31",
    user: "1",
    body: "quia incidunt ut\naliquid est ut rerum deleniti iure est\nipsum quia ea sint et\nvoluptatem quaerat eaque repudiandae eveniet aut",
  },
  {
    post: "7",
    id: "32",
    user: "1",
    body: "nihil ea itaque libero illo\nofficiis quo quo dicta inventore consequatur voluptas voluptatem\ncorporis sed necessitatibus velit tempore\nrerum velit et temporibus",
  },
  {
    post: "7",
    id: "33",
    user: "1",
    body: "fugit harum quae vero\nlibero unde tempore\nsoluta eaque culpa sequi quibusdam nulla id\net et necessitatibus",
  },
  {
    post: "7",
    id: "34",
    user: "1",
    body: "omnis temporibus quasi ab omnis\nfacilis et omnis illum quae quasi aut\nminus iure ex rem ut reprehenderit\nin non fugit",
  },
  {
    post: "7",
    id: "35",
    user: "1",
    body: "dolor mollitia quidem facere et\nvel est ut\nut repudiandae est quidem dolorem sed atque\nrem quia aut adipisci sunt",
  },
  {
    post: "8",
    id: "36",
    user: "1",
    body: "aut vero est\ndolor non aut excepturi dignissimos illo nisi aut quas\naut magni quia nostrum provident magnam quas modi maxime\nvoluptatem et molestiae",
  },
  {
    post: "8",
    id: "37",
    user: "1",
    body: "qui rem amet aut\ncumque maiores earum ut quia sit nam esse qui\niusto aspernatur quis voluptas\ndolorem distinctio ex temporibus rem",
  },
  {
    post: "8",
    id: "38",
    user: "1",
    body: "unde voluptatem qui dicta\nvel ad aut eos error consequatur voluptatem\nadipisci doloribus qui est sit aut\nvelit aut et ea ratione eveniet iure fuga",
  },
  {
    post: "8",
    id: "39",
    user: "1",
    body: "atque consequatur dolorem sunt\nadipisci autem et\nvoluptatibus et quae necessitatibus rerum eaque aperiam nostrum nemo\neligendi sed et beatae et inventore",
  },
  {
    post: "8",
    id: "40",
    user: "1",
    body: "quod minus alias quos\nperferendis labore molestias quae ut ut corporis deserunt vitae\net quaerat ut et ullam unde asperiores\ncum voluptatem cumque",
  },
  {
    post: "9",
    id: "41",
    user: "1",
    body: "facere repudiandae vitae ea aut sed quo ut et\nfacere nihil ut voluptates in\nsaepe cupiditate accusantium numquam dolores\ninventore sint mollitia provident",
  },
  {
    post: "9",
    id: "42",
    user: "1",
    body: "aut culpa quaerat veritatis eos debitis\naut repellat eius explicabo et\nofficiis quo sint at magni ratione et iure\nincidunt quo sequi quia dolorum beatae qui",
  },
  {
    post: "9",
    id: "43",
    user: "1",
    body: "voluptatem ut possimus laborum quae ut commodi delectus\nin et consequatur\nin voluptas beatae molestiae\nest rerum laborum et et velit sint ipsum dolorem",
  },
  {
    post: "9",
    id: "44",
    user: "1",
    body: "qui sunt commodi\nsint vel optio vitae quis qui non distinctio\nid quasi modi dicta\neos nihil sit inventore est numquam officiis",
  },
  {
    post: "9",
    id: "45",
    user: "1",
    body: "ipsum odio harum voluptatem sunt cumque et dolores\nnihil laboriosam neque commodi qui est\nquos numquam voluptatum\ncorporis quo in vitae similique cumque tempore",
  },
  {
    post: "1",
    id: "46",
    user: "9",
    body: "exercitationem et id quae cum omnis\nvoluptatibus accusantium et quidem\nut ipsam sint\ndoloremque illo ex atque necessitatibus sed",
  },
  {
    post: "10",
    id: "47",
    user: "10",
    body: "occaecati laudantium ratione non cumque\nearum quod non enim soluta nisi velit similique voluptatibus\nesse laudantium consequatur voluptatem rem eaque voluptatem aut ut\net sit quam",
  },
  {
    post: "10",
    id: "48",
    user: "9",
    body: "illum et alias quidem magni voluptatum\nab soluta ea qui saepe corrupti hic et\ncum repellat esse\nest sint vel veritatis officia consequuntur cum",
  },
  {
    post: "10",
    id: "49",
    user: "6",
    body: "id est iure occaecati quam similique enim\nab repudiandae non\nillum expedita quam excepturi soluta qui placeat\nperspiciatis optio maiores non doloremque aut iusto sapiente",
  },
  {
    post: "10",
    id: "50",
    user: "6",
    body: "eum accusamus aut delectus\narchitecto blanditiis quia sunt\nrerum harum sit quos quia aspernatur vel corrupti inventore\nanimi dicta vel corporis",
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
        comments: [Comment!]!
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

    type Comment {
        post: Post!,
        id: String!,
        user: User!,
        body: String!
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
    comments() {
      return comments;
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
  Comment: {
    post(parent, args, context, info) {
      const p = posts.find((post) => post.id === parent.post);
      return p;
    },
    user(parent, args, context, info) {
      const p = users.find((user) => user.id === parent.user);
      return p;
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
