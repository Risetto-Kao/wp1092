import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();


const isExisting = async (name) =>{
  console.log('Checking: if name & subject is existing');
  const existing = await ScoreCard.findOne({name});
  return existing;
}

router.post('/create-card', async function (req, res) {
  try {
    const { name, subject, score } = req.body;
    console.log(name,subject,score)
    console.log('at backend: create card');
    console.log('------');

    if (isExisting(name)) {
      console.log(`Result: name(${name}) & subject(${subject}) is existing`);
      // const newScoreCard = new ScoreCard({name,subject,score});
      const filter = {name:name,subject:subject};
      const update = {score:score};
      ScoreCard.findOneAndUpdate(filter,update);

      console.log('Update success at isExisting');
      
      const newScoreCard = new ScoreCard({name,subject,score});
      const message = `Updating Name: ${name}, Subject: ${subject}, Score: ${score}`;
      res.send({newScoreCard,message});
    }
    else {
      console.log(`Result: name(${name}) & subject(${subject}) is not existing`);

      const newScoreCard = new ScoreCard({name,subject,score});
      newScoreCard.save();
      console.log('Save success at isNotExisting');

      const message = `Adding Name: ${Name}, Subject: ${Subject}, Score: ${Score}`;
      res.send({newScoreCard,message});
    }
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: `Something went wrong when creating card. Error: ${error}` });
  }
});

router.delete('/delete',(req,res)=>{
  try {
    console.log('at backend');
    console.log(req);
    console.log(res);
  } catch (error) {
    console.log(error)
    res.json({ message: `Something went wrong when deleting. Error: ${error}` });
  }
});
// TODO: delete the collection of the DB
// router.delete(...)

// TODO: implement the DB query
// route.xx(xxxx)
router.get('/query-data',(req,res)=>{
  try {
    
  } catch (error) {
    res.json({ message: `Something went wrong when querying data. Error: ${error}` });
  }
});

export default router;
