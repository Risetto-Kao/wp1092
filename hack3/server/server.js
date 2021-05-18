import express from 'express'
import routes from './routes'
import mongoose, { set } from 'mongoose'
import { dataInit } from './upload'
import Station from './models/station'

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  poolSize: 10
}
// connect mongo correctly
// coding here ...
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo connected!');
  dataInit();
  Station.find({}, (error, data) => {

    
    // console.log(error);
    // let line = []
    // data.map((e) => line.push(e.station_type))
    // let res = {}
    // line.map((e)=>{
    //   res[e] = []
    //   // console.log(res)
    //   data.map((ele)=>{
    //     if (e === ele.station_type){
    //       console.log('The same');
    //       res[e].push(ele);
    //     } else {
    //       console.log('Not the same');
    //     }
    //   })
    // })
    // res.keys((e)=>{
    //   e.sort((a,b)=>a-b)
    // })

    // console.log(line.keys())
    // line.keys((color)=>{
    //   line.color = []
    //   data.map((e)=>{
    //     if (color === e.station_type){
    //       console.log('The same')
    //       line.color.push(e);
    //       console.log(e.station_id)
    //     } else {
    //       console.log('Not the same');
    //       console.log(e.station_id)
    //     }
    //     console.log('---')
    //   })
    // })

   
    

  })

  // console.log(Station.find({},(error)=>console.log(`Something went wrong when find all ${error}`)))
  // console.log(Station.find({},(err,data)=>{
  //   con
  // }));
});


routes(app)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
