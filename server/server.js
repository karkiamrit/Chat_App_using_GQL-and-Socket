import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const messages=[];
const typeDefs=`#graphql
    type Message{
        id : ID!
        user: String!
    }
    type Query{
        messages:[Message!]
    }    
`
const resolvers={
    Query:{
        messages:()=>messages,
            
    }
}

const server= new ApolloServer({typeDefs,resolvers});

const {url}=await startStandaloneServer(server,{
   listen :{ port:4000 },
});
console.log(`Server is running on ${url}`)