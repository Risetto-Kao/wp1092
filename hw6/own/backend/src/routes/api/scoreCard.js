import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();



router.post('/create-card', async function (req, res) {
  try {
    const { name, subject, score } = req.body;
    console.log(name, subject, score)
    console.log('at backend: create card');
    console.log('------');

    const updateMessage = `Updating (${name}, ${subject}, ${score})`;
    const addMessage = `Adding (${name}, ${subject}, ${score})`;

    const newScoreCard = new ScoreCard({ name, subject, score });
    const filterVariable = { name: name, subject: subject };
    const updateVariable = { score: score };

    const isExisting = await ScoreCard.findOne(filterVariable);

    if (isExisting) {
      // update
      await ScoreCard.findOneAndUpdate(filterVariable, updateVariable)
      console.log('Update: success at database')
      res.status(200).send({ message: updateMessage, card: newScoreCard });
      console.log('Update: success to frontend')
    } else {
      // add
      await newScoreCard.save();
      console.log('Add: success at database')
      res.status(200).send({ message: addMessage, card: newScoreCard });
      console.log('Add: success to frontend')
    }
  } catch (error) {
    res.send({ message: `Something went wrong when creating card. Error: ${error}` });
    console.log(`Error at database: ${error}`);
  }
});

router.delete('/delete', async (req, res) => {
  const deleteMessage = 'Database cleared';
  try {
    await ScoreCard.deleteMany({});
    console.log('Delete: success at database');
    res.send({ message: deleteMessage });
    console.log('Delete: success to frontend');
  } catch (error) {
    console.log(error)
    res.send({ message: `Something went wrong when deleting. Error: ${error}` });
  }
});

router.post('/query-data', async (req, res) => {
  const { queryType, queryString,currentIndex,maxInOnePage } = req.body;
  console.log(`---currentIndex = ${currentIndex}`);
  const queryCondition = generateQueryCondition(queryType,queryString);
  // console.log(`QueryCondition: ${queryCondition}`);
  const notFoundMessage = `${queryType}: ${queryString} not found`;
  try {  
    let queryData = await ScoreCard.find(queryCondition,(error,docs)=>{
      return docs;
    }).sort({name:1,subject:1}).exec();
    if (queryData.length !== 0){
      let passData = [];
      if (queryData.length < currentIndex + maxInOnePage) {
        for (let i = currentIndex; i < queryData.length ; i++){
          passData.push(queryData[i]);
        }
      } else {
        for (let i = currentIndex; i < (currentIndex + maxInOnePage) ; i++){
          passData.push(queryData[i]);
        }
      }
      // let passData = [queryData[currentIndex],queryData[currentIndex+1],queryData[currentIndex+2]];
      // console.log(`queryData's type is ${passData}`)
      res.status(200).send({messages:JSON.stringify(passData),allDataLength:queryData.length});
    } else {
      console.log(`not found`)
      res.status(200).send({message:notFoundMessage})
    }
  } catch (error) {
    res.json({ message: `Something went wrong when querying data. Error: ${error}` });
  }
});

const generateQueryCondition = (queryType, queryString) => {
  let queryCondition;
  switch (queryType) {
    case 'name':
      queryCondition = { name: queryString };
      break

    case 'subject':
      queryCondition = { subject: queryString };
      break

    default:
      console.log('query NOT legal');
      queryCondition = {};
      break
  }
  return queryCondition;
}

export default router;
