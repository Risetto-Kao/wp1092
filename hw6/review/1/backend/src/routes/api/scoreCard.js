import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    
    const card = req.body;
    const existing = await ScoreCard.findOne({name: card.name, subject: card.subject});
    
    if (existing) {
      await ScoreCard.updateOne(
        {name: card.name, subject: card.subject},
        {name: card.name, subject: card.subject, score: card.score},
      );
      const message = `Updating (${card.name}, ${card.subject}, ${card.score})`;
      res.send({message, card});
    }
    else {
      await ScoreCard.create({name: card.name, subject: card.subject, score: card.score});
      const message = `Adding (${card.name}, ${card.subject}, ${card.score})`;
      res.send({message, card});
    }

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear-db', async function (_, res) {
  try {
    await ScoreCard.deleteMany({});
    const message = `Database cleared`;
    res.send({message});

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)

router.post('/query', async function (req, res) {
  try {
    if (req.body.queryType === 'Name') {
      const existing = await ScoreCard.findOne({name: req.body.queryString});
      if (existing) {
        const result = await ScoreCard.find({name: req.body.queryString});
        const messages_list = result.map(i => `(${i.name}, ${i.subject}, ${i.score})`);
        res.json({messages: messages_list});
      }
      else {
        res.json({message: `${req.body.queryType} (${req.body.queryString}) not found!`});
      }
    }
    else if (req.body.queryType === 'Subject') {
      const existing = await ScoreCard.findOne({subject: req.body.queryString});
      if (existing) {
        const result = await ScoreCard.find({subject: req.body.queryString});
        const messages_list = result.map(i => `(${i.name}, ${i.subject}, ${i.score})`);
        res.json({messages: messages_list});
      }
      else {
        res.json({message: `${req.body.queryType} (${req.body.queryString}) not found!`});
      }
    }

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
