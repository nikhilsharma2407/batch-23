const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, } = require('graphql');

// Construct a schema, using GraphQL schema language

const friendsData = [
    {
        "id": "60d0fe4f5311236168a109ca",
        "title": "ms",
        "firstName": "Sara",
        "lastName": "Andersen",
        "picture": "https://randomuser.me/api/portraits/women/58.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109cb",
        "title": "miss",
        "firstName": "Edita",
        "lastName": "Vestering",
        "picture": "https://randomuser.me/api/portraits/med/women/89.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109cc",
        "title": "ms",
        "firstName": "Adina",
        "lastName": "Barbosa",
        "picture": "https://randomuser.me/api/portraits/med/women/28.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109cd",
        "title": "mr",
        "firstName": "Roberto",
        "lastName": "Vega",
        "picture": "https://randomuser.me/api/portraits/med/men/25.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109ce",
        "title": "mr",
        "firstName": "Rudi",
        "lastName": "Droste",
        "picture": "https://randomuser.me/api/portraits/med/men/83.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109cf",
        "title": "mrs",
        "firstName": "Carolina",
        "lastName": "Lima",
        "picture": "https://randomuser.me/api/portraits/med/women/5.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109d0",
        "title": "mr",
        "firstName": "Emre",
        "lastName": "Asikoglu",
        "picture": "https://randomuser.me/api/portraits/med/men/23.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109d1",
        "title": "mr",
        "firstName": "Kent",
        "lastName": "Brewer",
        "picture": "https://randomuser.me/api/portraits/med/men/52.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109d2",
        "title": "mr",
        "firstName": "Evan",
        "lastName": "Carlson",
        "picture": "https://randomuser.me/api/portraits/med/men/80.jpg"
    },
    {
        "id": "60d0fe4f5311236168a109d3",
        "title": "mr",
        "firstName": "Friedrich-Karl",
        "lastName": "Brand",
        "picture": "https://randomuser.me/api/portraits/med/men/7.jpg"
    }
]

const userData = [
    {
        username: "nikhil",
        name: "Nikhil",
        friendList: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
    },
    {
        username: "test",
        name: "Test",
        friendList: ["60d0fe4f5311236168a109ca", "60d0fe4f5311236168a109cb"]
    },
]

const FriendType = new GraphQLObjectType({
    name: "Friend",
    description: "This is the friend Object",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        picture: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: ({ title, firstName, lastName }) => `${title} ${firstName} ${lastName}`
        }
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    description: "This is the user type",
    fields: () => ({
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        friendList: { type: GraphQLList(GraphQLString) },
        friends: {
            type: GraphQLList(FriendType),
            resolve: (user) => user.friendList?.map(id => friendsData.find(friend => friend.id === id))
        }
    })
})

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is the Query Object",
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello World"
        },
        friends: {
            type: GraphQLList(FriendType),
            description: "Return list of all friends",
            resolve: () => friendsData
        },
        friend: {
            type: GraphQLList(FriendType),
            description: "Find all friend by name",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (friend, args) => {
                console.log({ friend }, { args });
                const data = friendsData.filter(e => e.firstName.includes(args.name));
                console.log("filtered Data", data);
                return data;
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: "Return list of all users",
            resolve: () => userData
        },
        user: {
            type: UserType,
            description: "Return user by username",
            args:{
                username:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve: (user, args) => userData.find(e => e.username === args.username)
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    description:"This is Mutation object",
    fields:()=>({
        addFriend:{
            type:FriendType,
            description:"Add a new Friend",
            args:{
                username:{type:GraphQLNonNull(GraphQLString)},
                id:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve:(data,args)=>{
                console.log({data});
                const {username,id} = args;
                const user = userData.find(e=>e.username===username);
                user.friendList.push(id);
                console.log(user);
                const friend = friendsData.find(e=>e.id===id);
                console.log(friend);
                return friend;
            }
        },
        signup:{
            type:UserType,
            description:"Create a new User",
            args:{
                username:{type:GraphQLNonNull(GraphQLString)},
                name:{type:GraphQLNonNull(GraphQLString)}
            },
            resolve:(data,args)=>{
                const user = {...args,friendList:[]};
                userData.push(user);
                return user;
            }
        },
    })
})

const schema = new GraphQLSchema({
    query: Query,
    mutation:Mutation,
})


const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.clear()
console.log('Running a GraphQL API server at http://localhost:4000/graphql');