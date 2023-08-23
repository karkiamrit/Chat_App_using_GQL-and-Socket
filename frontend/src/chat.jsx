import {useQuery, gql, useMutation} from '@apollo/client';
import React from "react";
import {useState} from "react";
import {
    Container,Row,Col,FormInput,Button
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

const POST_MESSAGE=gql`
    mutation($user:String!,$content:String!){
        postMessage(
        user:$user
        content:$content
        )
    }
    
`

const Messages = ({user}) => {
    const {data}=useQuery(GET_MESSAGES);
    if(!data){
        return null;
    }
    return(
        <>
       
            {data.messages.map(({id,user:messageUser,content})=>(
                <div style={{
                    display:'flex',
                    justifyContent:user===messageUser?'flex-end':'flex-start',
                    paddingBottom:'1em'
                }} key={id}>
                    {user!== messageUser && (
                        <div 
                            style={{
                                height:43,
                                width:50,
                                marginRight:'0.5em',
                                border:'2px solid #e5e6ea',
                                borderRadius:50,
                                textAlign:'center',
                                fontSize:'18pt',
                                paddingTop:7,
                                justifyContent:'center'
                            }}
                        >
                            {messageUser.slice(0,2).toUpperCase()}
                        </div>
                    )}
                    <div style={{
                         background:user===messageUser? "#58bf56":"#e5e6ea",
                         color:user===messageUser ?"white":"black", 
                         padding:'1em',
                         paddingTop:15,
                         borderRadius:'1em',
                         maxWidth:'60%'
                         }}>
                                {content}
                    </div>
                </div>)  
            )}
        </>
    )}

const Chat = () => {
    const [state,stateSet]=useState({
        user:'Ram',
        content:'',
    })
    const [postMessage]=useMutation(POST_MESSAGE);
    const onSend=()=>{
        if(state.content.length>0){

        }
        stateSet({
            ...state,content:'',
        })

    }
    return (
        <Container>
        <Messages user={state.user} />
        <Row>
            <Col xs={2} style={{padding:0}}>
                <FormInput 
                    label="User"
                    value={state.user}
                    onChange={
                        (e)=>{stateSet({...state,user:e.target.value})}
                    }/>

            </Col>
            <Col xs={8}>
                <FormInput 
                    label="User"
                    value={state.content}
                    onChange={
                        (e)=>{stateSet({...state,content:e.target.value})}
                    }
                    onKeyUp={(e)=>{
                        if(e.keyCode===13){
                            onSend();
                        }
                    }}
                    />

            </Col>
            <Col xs={2} style={{paddding:0}}>
                <Button onClick={()=>onSend()}>Send</Button>

            </Col>
        </Row>
        </Container>
    )
}
export default Chat;