import generateChatBoxName from "../src/util.js";
// import uuidv4 from 'uuid/v4';

const Mutation = {

    async createChatBox(parent, { userName, friend }, { db, pubsub }, info) {

        // generate the chatbox's name
        const chatBoxName = generateChatBoxName(userName, friend);

        // a function for checking if the user is in db or not
        const checkUser = async (db, userName) => {
            const isExisting = await db.UserModel.findOne({ name: userName });
            return isExisting;
        }

        // a function for checking if the chatBox is in db or not
        const checkChatBoxName = async (db, chatBoxName) => {
            const isExisting = await db.ChatBoxModel.findOne({ chatBoxName });
            return isExisting;
        }

        // if the user is not in db, add him/her into db
        const addNewUser = async (db, userName) => {
            const newUser = new db.UserModel({ name: userName });
            await newUser.save();
        }

        // check if username && friend is not null
        if (!userName || !friend) throw new Error("Missing chatBox name for CreateChatBox");

        // check if user is in db or not
        if (!(await checkUser(db, userName, "createChatBox"))) {
            console.log("User does not exist for createChatBox: " + userName);
            await addNewUser(db, userName);
        }

        // check if the chatBox is in db or not 
        if (!checkChatBoxName(db, chatBoxName)) {
            console.log("The chatBox is already existing! " + chatBoxName);
            throw new Error("The chatBox is already existing!")
        }

        // create a new chatBox and save it into db
        const newChatBox = new db.ChatBoxModel({
            // id: uuidv4(), ??
            
            messages: [],
            chatBoxName: chatBoxName
        });
        await newChatBox.save();

        pubsub.publish(`chatBoxName_${chatBoxName}`,{
            // TODO: Add subscription 
        });

        return newChatBox;
    },

    async createMessage(parent, {userName, friend}, {db, pubsub}, info){
        
    }



}

export default Mutation;