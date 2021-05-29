import react from 'react';
import '../App.css';

import { useState } from "react";
import { Tabs, Input } from "antd";

const {TabPane} = Tabs;
const ChatRoomPage = ({userName}) => {
  const [chatBoxes, setChatBoxes] = useState([
    {friend: 'Mary', key:'MaryChatBox',chatLog:[]},
    {friend: 'Peter', key:'PeterChatBox',chatLog:[]},
  ]); 

  const [messageInput, setMessageInput] = useState('');

  return( 
  <>
    <div className='App-title'><h1>{userName}'s Chat Room</h1></div>
    <div className='App-messages'>
      <Tabs
        type='editable-card'
        onEdit = {(targetKey, action) => {if (action === 'add') addChatBox();}}>
        {chatBoxes.map(({friend,key,chatLog})=>{
          return (
            <TabPane tab={friend} key={key} closable={true}>{friend}'s ChatBox.</TabPane>
          );
        })}
      </Tabs>
    </div>
    <Input.Search
        value={messageInput}
        onChange={(e) => 
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
          "Enter message here..."
        onSearch={(msg) => 
          { setMessageInput(""); }}
      ></Input.Search> 
  </>
  );
};

export default ChatRoomPage;
  
 
