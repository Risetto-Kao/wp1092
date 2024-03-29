

const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

// the coding format of the import
const mongo = require('./mongo');

const app = express();

/* -------------------------------------------------------------------------- */
/*                               MONGOOSE MODELS                              */
/* -------------------------------------------------------------------------- */
const { Schema } = mongoose;


// type:{mongoose.Types.ObjectId} => nested structure
// e.g. chatBoxes: { type: mongoose.Types.ObjectId, ref: 'ChatBox' } => get data from ChatBoxModel
// But why is it so complicated ?
// For modulize. 

const userSchema = new Schema({
  name: { type: String, required: true },
  chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});


// mongoose.model(name, schema);
// => the mongo db would name the collection 'name' + 's' => 'names'
// and it would be all lowercase
const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);

/* -------------------------------------------------------------------------- */
/*                                  UTILITIES                                 */
/* -------------------------------------------------------------------------- */

// for creating a chatBox's name standizely
const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

/* -------------------------------------------------------------------------- */
/*                            SERVER INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
const server = http.createServer(app);

// websocket
const wss = new WebSocket.Server({
  server,
});

// app.use([routingPath], callback)

// path.join => add the two input path
// e.g. dirname => C:\Users\user\Documents\GitHub\wp1092\hw7\own\backend
//      add public => C:\Users\user\Documents\GitHub\wp1092\hw7\own\backend\public

// Express static
// static: 大家看到的都會一樣的東西
// direct to frontend (in public)
app.use(express.static(path.join(__dirname, 'public')));

// check if the input username is existing
const validateUser = async (name) => {
  const existing = await UserModel.findOne({ name });
  if (existing) return existing;
  return new UserModel({ name }).save();
};

// populate => connect the self defined object
const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) box = await new ChatBoxModel({ name, users: participants }).save();

  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};



const chatBoxes = {}; // keep track of all open AND active chat boxes

wss.on('connection', function connection(client) {

  client.id = uuid.v4();
  client.box = ''; // keep track of client's CURRENT chat box

  client.sendEvent = (e) => client.send(JSON.stringify(e));
  // console.log(client)
  client.on('message', async function incoming(message) {
    message = JSON.parse(message);
    // message = {
    //   type: xxx, 
    //   data: {name: xxx, to: xxx, body: xxx, ...} 
    // }
    const { type } = message;
    console.log(type);
    switch (type) {
      // on open chat box
      case 'CHAT': {
        const {
          data: { name, to },
        } = message;

        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);
        
        // if client was in a chat box, remove that.
        if (chatBoxes[client.box])
          // user was in another chat box
          chatBoxes[client.box].delete(client);

        // use set to avoid duplicates
        client.box = chatBoxName;
        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
        chatBoxes[chatBoxName].add(client); // add this open connection into chat box

        client.sendEvent({
          type: 'CHAT',
          data: {
            messages: chatBox.messages.map(({ sender: { name }, body }) => ({
              name,
              body,
            })),
          },
        });

        break;
      }
      // add a message to db
      case 'MESSAGE': {
        const {
          data: { name, to, body },
        } = message;
        console.log(name, to, body);
        const chatBoxName = makeName(name, to);

        const sender = await validateUser(name);
        const receiver = await validateUser(to);
        const chatBox = await validateChatBox(chatBoxName, [sender, receiver]);

        const newMessage = new MessageModel({ sender, body });
        await newMessage.save();

        chatBox.messages.push(newMessage);
        await chatBox.save();

        // two side both open the chatbox
        chatBoxes[chatBoxName].forEach((client) => {
          client.sendEvent({
            type: 'MESSAGE',
            data: {
              message: {
                name,
                body,
              },
            },
          });
        });
      }
    }

    // disconnected
    client.once('close', () => {
      chatBoxes[client.box].delete(client);
    });
  });
});

mongo.connect();

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});


// Coding order
// mongoose => connect
// server set up 
// server.on