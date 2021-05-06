import express from 'express'
import getNumber from '../core/getNumber'
import { serverUpTime } from '../server'

const router = express.Router()
const fs = require('fs')
const dateFormator = require('date-and-time')

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true)

  let startTime = new Date();
  startTime = dateFormator.format(startTime,'YYYY-MM-DD-HH-mm-ss')
  startTime = startTime.toString();
  console.log(startTime+'\n---')
  fs.appendFile(`server/log/${serverUpTime}.log`,`[${startTime}] Game Start: Answer => ${number}\n`,(error)=>{console.log(`When writing to log: ${error} at Start`)})
  console.log('writefile\n---')

  res.json({ msg: 'The game has started.' })

})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
  else {

    let guessTime = new Date();
    guessTime = dateFormator.format(guessTime,'YYYY-MM-DD-HH-mm-ss').toString();
    fs.appendFile(`server/log/${serverUpTime}.log`,`[${guessTime}] Guess: ${guessed}\n`,(error)=>{console.log(`When writing to log: ${error} at Guess`)})


    if (guessed < number) res.status(200).send({msg:'Bigger'})
    else if (guessed > number) res.status(200).send({msg:'Smaller'})
    else {res.status(200).send({msg:'Equal'}); 
    fs.appendFile(`server/log/${serverUpTime}.log`,`[${guessTime}] End Game\n`,(error)=>{console.log(`When writing to log: ${error} at End`)})}
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart',(_,res)=>{
  const number = getNumber(true)
  
  let restartTime = new Date();
  restartTime = dateFormator.format(restartTime,'YYYY-MM-DD-HH-mm-ss').toString();
  fs.appendFile(`server/log/${serverUpTime}.log`,`[${restartTime}] Game Restart: Answer => ${number}\n`,(error)=>{console.log(`When writing to log: ${error} at Restart`)})

  res.json({ msg: 'The game has restarted.' })
}

)





export default router
