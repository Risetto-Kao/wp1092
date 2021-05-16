import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const { name, subject, score } = req.query;
    console.log('at backend: create card');
    console.log(req);
    console.log(res);
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
