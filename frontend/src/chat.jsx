import {useQuery, gql} from '@apollo/client';
import React from "react";
import {
    Cointainer
} from "shards-react";

const GET_MESSAGES=gql`
query{
  messages {
    id
    user
    content
    
  }
}
`;

const Messages = ({user}) => {
    const {data}=useQuery(GET_MESSAGES);
    if(!data){
        return null;
    }
    return JSON.stringify(data);
}

const Chat = () => {
    return (
        <>
        <Messages user="Ram" />
        </>
    )
}
export default Chat;