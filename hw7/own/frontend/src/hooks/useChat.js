import { useState } from 'react';

//TODO: connect to backend
const useChat = () => {
    const [status, setStatus] = useState({});
    const [message, setMessage] = useState([])
    const client = new WebSocket('ws://localhost:8080');

    // client.onmessage = (byteString) => {
    //     const {data} = byteString;
    //     const [task, payload] = JSON.parse(data);
    //     switch (task) {
    //         case 'output':

    //             break;
    //         case 'init':
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const sendMessage = (data) => {
        console.log(data)
        client.send(JSON.stringify({type:'MESSAGE',data:{to: data.key, name: data.userName, body:data.msg}}));

    }


    return { status, sendMessage };
}
export default useChat;