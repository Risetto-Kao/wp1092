import '../App.css';
import {useState} from 'react';
import {Tabs, Input} from 'antd';
import ChatModal from '../Components/ChatModal';
import ChatBox from './ChatBox'
import useChatBox from '../hook/useChatBox'
import displayStatus from '../hook/useDisplayMsg'

const {TabPane} = Tabs;
const ChatRoom = ({me}) => {
    const [messageInput, setMessageInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState('');
    const addChatBox = () => {
        setModalVisible(true)
    }
    const {chatBoxes, createChatBox, removeChatBox, sendMessage} = useChatBox()
    return (
        <>
            <div className='App-title'>
                <h1>{me}'s Chat Room'</h1> </div>
            <div className='App-messages'>
                <Tabs type='editable-card' 
                        onEdit={(targetKey, action)=> {
                            if(action === 'add') addChatBox()
                            if(action === 'remove'){
                                const newkey = removeChatBox(targetKey, activeKey)
                                setActiveKey(newkey)
                            }
                        }}
                        activeKey={activeKey}
                        onChange={(key) => {setActiveKey(key);}}
                        >
                    {chatBoxes.map(({friend, key, chatLog})=>{
                        return (
                            <TabPane tab={friend}
                                key={key} closable={true}>
                                <ChatBox me={me} chatbox_key={key} friend={friend}/>
                            </TabPane>
                        )
                    })}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={async ({name})=>{
                        const newkey = await createChatBox(name, me);
                        setActiveKey(newkey)
                        setModalVisible(false);
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
                enterButton='Send' 
                placeholder='Enter message here...'
                onSearch={async (msg)=>{
                    if(!msg){
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message.'
                        });
                        return;
                    } else if(activeKey === ''){
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.'
                        });
                        setMessageInput('');
                        return;
                    }
                    const names = activeKey.split('_')
                    var myname, friendname;
                    if(names[0] === me){
                        myname = names[0]
                        friendname = names[1]
                    }
                    else{
                        myname = names[1]
                        friendname = names[0]
                    }
                    await sendMessage({name: myname, to: friendname, body:messageInput})
                    setMessageInput('');
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom;