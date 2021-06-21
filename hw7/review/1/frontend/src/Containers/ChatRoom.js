import "../App.css"
import {useState} from "react";
import {Tabs, Input} from "antd";
//ChatModal 中只有一個 modal 不需要如下寫法 會報錯
//import {ChatModal} from "../Components/ChatModal"
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox"
import "../Components/ChatBox.css"
const {TabPane} = Tabs;





//const ChatRoom = ( {me,displayStatus, server,startChat,sendMessage,onEvent } ) => {
const ChatRoom = ( {me,displayStatus} ) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false); 
    const [activeKey, setActiveKey] = useState("")
    const [messages,setMessages] = useState([]); 
    var count = 0; 
    const addChatBox = () => { setModalVisible(true); };



    // equal to `sendMessage = useChat.sendMessage`
    //const {sendMessage} = useChat();
    const  {chatBoxes,createChatBox, removeChatBox} = useChatBox(); 
  

    const seperate_name = (chatboxname,me)=>{
      let names = chatboxname.split("_");
      if (names[0] === me)
        return names[1]
      else
        return names[0]
    }   

    const test = () =>{
      console.log(messages)
    }

    const server = new WebSocket('ws://localhost:8080');
      server.onopen = () => console.log('Server connected.');
      // 當伺服器傳來資料時  
      server.onmessage = (m) => {
          count += 1
          console.log(count)
          onEvent(JSON.parse(m.data));
      };
    server.sendEvent = (e) => server.send(JSON.stringify(e));
    
    const register = (me) =>{
      server.sendEvent({
        type:"REGISTER",
        data:{name:me}
      }
      )
    }

    const startChat = (me,to) => {
      server.sendEvent({
          type: 'CHAT',
          data: { to: to, name: me },
        });
    };
  
    const sendMessage = (me,to,message) => {
      /* 檢查是否有空輸入
      if (!inputDOM.value || !nameDOM.value || !toDOM.value) {
        throw new Error('Empty input!');
      }
      */
      server.sendEvent({
          type: 'MESSAGE',
          data: { to: to, name: me, body: message },
        });
      };

      const onEvent = (e) => {
        const { type } = e;
        switch (type) {
          case 'CHAT': {
            let m = e.data.messages;
            console.log(messages)
            setMessages(m)
            console.log(messages)
            break;
          }
          case 'MESSAGE': {
           // messages.push(e.data.message);
            let m = messages
            m.push(e.data.message)
            console.log(e.data.message)
            console.log((messages))
            //let temp = messages.push(e.data.message)
            //setMessages(temp)
             //怪怪得
            setMessages(m)
             //setMessages([...messages , e.data.message])
            console.log(messages)
            break;
          }
        }

        //renderMessages();
      }

      
    return (
    <> <div className="App-title"> 
         <h1>{me}'s Chat Room</h1> </div> 
      <div className="App-messages"> 
        <Tabs 
            type="editable-card" 
            activeKey={activeKey} 
            onChange={(key) => { 
              let to = seperate_name(key);
              startChat(me,to)
              console.log("Change")
              console.log(messages)
              setActiveKey(key); }}
            onEdit={(targetKey, action) => {
             if (action === "add") addChatBox();
             else if (action === "remove") setActiveKey(removeChatBox(targetKey,activeKey)); 
              }}
            > 
          {chatBoxes.map((
            { friend, key, chatLog }) => {    
                           return (
              <TabPane tab={friend} 
                key={key} closable={true}> 
                <ul className="Messages-list">
                {  messages.map((m,key)=>
                   m.name === me
                   ?
                 <li className="Messages-message currentMember" id={key}>
                   <div className="Message-content">
                <div className="username">
                  {m.name}
                </div>
                <div className="text">{m.body}</div>
                </div>
                 </li>
                 :                 
                 <li className="Messages-message">
                   <div className="Message-content">
                <div className="username">
                  {m.name}
                </div>
                <div className="text">{m.body}</div>
                </div>
                 </li>
                
                 )
                }
                    </ul>
              </TabPane>
          );})}
       </Tabs>
        <ChatModal 
          visible={modalVisible} 
          onCreate={({ name }) => { 
            setActiveKey(createChatBox(name,me)); 
            setModalVisible(false); 
            startChat(me,name);
            //console.log("Create")
            //console.log(messages)
          }}
          onCancel={() => { 
            setModalVisible(false); 
          }}

        />
      </div>
      <Input.Search 
        value={messageInput} 
        onChange={(e) => 
          setMessageInput(e.target.value)} 
        enterButton="Send" 
        placeholder=
          "Enter message here..." 
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter message.", 
            });
            return;
          } else if (activeKey === "") { 
            displayStatus({
              type: "error",
              msg: "Please add a chatbox first.", 
            });
            setMessageInput("");
            return;
          }
          let to = seperate_name(activeKey,me);
          //sendMessage({ key: activeKey, body: msg }); 
          sendMessage(me, to, msg)
          setMessageInput("");
        }}
      ></Input.Search>
      <button onClick={test}/>
  </>);
};
export default ChatRoom;