import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import User from './models/user.js'

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});
const saveUser = async (id, name) => {
    const existing = await User.findOne({name});
    if(existing) throw new Error(`data ${name} exists`);
    try{
        const newUser = new User({id,name});
        console.log('Created user',newUser);
        return newUser.save();
    }catch(e){
        throw new Error("User creation error: "+e)
    }
}

const deletDB = async () => {
    try {
        await User.deleteMany({})
        console.log("Database deleted")
    } catch (error) {
        throw new Error("Database deletion failed")
    }
}

const db = mongoose.connection;
db.on("error",(err)=>console.log(err));
db.once("open",async()=>{
    await deletDB;
    await saveUser(57,"Ric");
    await saveUser(108,"sandy");
    await saveUser(87,"max");
})