import {Component} from "react";
import React from "react"
import  "./ChatBox.css"


class Messages extends Component {
  render() {
    console.log(this.props)
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {sendername, body} = message;
    const {me} = this.props;
    const messageFromMe = sendername === me;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
      {/*<span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />*/}
        <div className="Message-content">
          <div className="username">
            {sendername}
          </div>
          <div className="text">{body}</div>
        </div>
      </li>
    );
  }
}

export default Messages;