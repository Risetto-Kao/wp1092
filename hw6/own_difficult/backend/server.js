import express from 'express';
const app = express();
const port = process.env.PORT||4000;
app.get('/',(req,res)=>{
    res.send('Hello');
});
app.listen(port,()=>{
    console.log(`on Port ${port}`);
});

// keyword: axios, express, mongodb, http request
// connection of the above items