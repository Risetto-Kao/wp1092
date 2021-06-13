import { Tag } from 'antd';


const Message = ({ messageInfo, userName }) => {

    const { sender, messageBody } = messageInfo;
    let senderIsUser = (userName === sender);

    const userMessage = <div className="App-message-user">
        <p>{messageBody}<Tag style={{marginLeft:5}} color='blue'>{sender}</Tag></p>
    </div>;

    const friendMessage = <div className="App-message-friend">
        <p><Tag color='green'>{sender}</Tag>{messageBody}</p>
    </div>;

    return senderIsUser ? userMessage : friendMessage;

}

export default Message;

