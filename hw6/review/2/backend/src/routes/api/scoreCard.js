import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';
import mongo from '../../mongo';

const router = Router();
  // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
router.post('/create-card', async function (req, res) {
  console.log("ininin")
  const name=req.body.name;
  const subject =req.body.subject;
  const score=req.body.score;
  const scoreData=new ScoreCard({name,subject,score})
  var findedcard;
  try {
    console.log(req.body)
    findedcard=await ScoreCard.find({name,subject})
    console.log(findedcard)
    if(findedcard.length>0){
      const toupdate=findedcard[0];
      await ScoreCard.updateOne({_id:toupdate._id},{name,subject,score});
      res.json({ message: 'update('+name+" "+subject+" "+score+" )",card:true });
    }else{
      await scoreData.save();
      res.json({ message: 'ADD('+name+" "+subject+" "+score+" )" ,card:true});
    }
    
  
  } catch (e) {
    console.log(e);
    res.json({ message: 'Something went wrong...' });
  }
});
// TODO: delete the collection of the DB
// router.delete(...)
router.post('/deleteAll', async function (req, res){
  try {
    console.log("removeall");
    await ScoreCard.deleteMany({})
    res.json({ message: 'Database cleared' });
  } catch (e) {
    console.log(e);
    res.json({ message: 'Something went wrong...' });
  }
})


// TODO: implement the DB query
// route.xx(xxxx)
router.get('/Query', async function (req, res){
  const typ=req.query.queryType;
  const Qstr =req.query.queryString;
  console.log(req.query)
 // const scoreData=new ScoreCard({name,subject,score})
 var findedcard
  try {
    if(req.query.queryType=="subject"){
      findedcard=await ScoreCard.find({subject:req.query.queryString})
      console.log(findedcard)
    }else if(req.query.queryType=="name"){
      findedcard=await ScoreCard.find({name:req.query.queryString})
      console.log(findedcard)
    }else if(req.query.queryType=="score"){
      const parsed = parseInt(req.query.queryString, 10);
      if(isNaN(parsed)){
        res.json({ message: req.query.queryString+'not a number...' });
      }
      findedcard=await ScoreCard.find({score:{ $gt: parsed } })
      console.log(findedcard)
    }
    res.json({messages:findedcard});
    /*
    if(findedcard.length==0){
      res.json({messages:[typ+"("+Qstr+") not found"]})
    }else{
      res.json({ messages: findedcard.map((card)=>("name:"+card.name+" subject:"+card.subject+" score:"+card.score)) });
      res.json({messages:findedcard});
    }*/
   
  } catch (e) {
    console.log(e);
    res.json({ message: 'Something went wrong...' });
  }
})



export default router;
