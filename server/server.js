import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const messages=[];
const typeDefs=`#graphql
    type Message{
        id : ID!
        user: String!
        content: String!
    }
    type Query{
        messages:[Message!]
    }    
    type Mutation{
        postMessage(user:String!,content:String!):ID!
    }
`

const resolvers={
    Query:{
        messages:()=>messages,
            
    },
    Mutation:{
        postMessage:(parent,{user,content})=>{
            const id=messages.length;
            messages.push({id,user,content});
            return id;
        }
    }
}

const server= new ApolloServer({typeDefs,resolvers});

const {url}=await startStandaloneServer(server,{
   listen :{ port:4000 },
});
console.log(`Server is running on ${url}`)