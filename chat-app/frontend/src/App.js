import './App.css'
import { Button, Input, Tag } from 'antd'
import useChat from './useChat'
import { useEffect, useState, useRef } from 'react'

function App() {
  // 變成local variable
  const {status, messages, sendMessage,clearMessages } = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const displayStatus = (payload) => {
    if(payload.msg){
      const {type, msg}=payload;
      const content = {
        content: msg, duration:0.5
      }
      switch (type) {
        case 'success':
          messages.success(content);
          break;
        case 'error':
          default:
            messages.error(content);
            break;
      }
    }
  }

  useEffect(()=>{
    displayStatus(status)
  },[status])

  const bodyRef = useRef(null)

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ?
          (<p style={{ color: '#ccc' }}>
            No messages...
          </p>) : (messages.map(({ name, body }, i) => (
            <p className="App-messages" key={i}>
              <Tag color="blue">{name}</Tag>{body}
            </p>
          ))
          )}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={e=>{if (e.key==='Enter') bodyRef.current.focus()}}
      ></Input>
      <Input.Search
        ref = {bodyRef}
        value={body}
        onChange={e => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
    
          sendMessage({ name: username, body: msg })
          setBody('')}}
        
      ></Input.Search>
    </div>
  )
}

export default App
