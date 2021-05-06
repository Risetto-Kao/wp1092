import express from 'express';
import bodyParser from 'body-parser'; 

const app = express();
const port = process.env.PORT || 4000

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Receive a GET HTTP method')
})
app.get('/',(req,res) => {
    // console.log(req)
    res.send('Hello, World');
});
app.listen(port,()=>{
    console.log(`Exampling app listening on port ${port}`)
})

app.get('/',(req,res)=>{
    res.send('Receive a GET HTTP method')
})

app.post('/', (req, res) => {
    console.log(req.body.text)
    res.send('Post')})

app.post('/users', (req, res) => {
    res.send('Post users')})

app.put('/users/:userId',(req,res)=>{
    res.send(`PUT ${req.params.userId}`)
})

app.delete('/',(req,res)=>{
    res.send('DELETE');
})
