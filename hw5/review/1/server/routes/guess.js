import express from 'express'
import getNumber from '../core/getNumber'


const fs = require('fs');


function getTime() {
    let time = new Date()
        .toLocaleString("sv-SE", { timeZone: "Asia/Taipei", hour12: false })
        .replace(" ", "-")
        .replaceAll(":", "-");
    return time;
}

const time = getTime().slice(0, 16);

if (!fs.existsSync('./server/log')){
    fs.mkdirSync('./server/log');
}


const serverOnLogFileName = `./server/log/${time}.log`;

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  // console.log(parsed);
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const number = getNumber(true);
  fs.appendFile(serverOnLogFileName, `start number=${number} ${getTime()}\n`, (err) => {
      if (err) {
        console.log(err);
      };
      console.log('start game log saved!');
  });
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
    fs.appendFile(serverOnLogFileName, `guess number=Not a legal number ${getTime()}\n`, (err) => {
      if (err) {
        console.log(err);
      };
      console.log('number not legal log saved!');
    });
  }
  else {
    fs.appendFile(serverOnLogFileName, `guess number=${guessed} ${getTime()}\n`, (err) => {
      if (err) {
        console.log(err);
      };
      console.log('guess number log saved!');
    });
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(number === guessed) {
      fs.appendFile(serverOnLogFileName, `end-game\n`, (err) => {
        if (err) {
          console.log(err);
        };
        console.log('end game log saved!');
      });
      res.status(200).send({ msg: 'Equal' });
    } else if (number > guessed) {
      res.status(200).send({ msg: 'Bigger' });
    } else {
      res.status(200).send({ msg: 'Smaller' });
    }

  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (req, res) => {
  const number = getNumber(true);
  fs.appendFile(serverOnLogFileName, `restart number=${number} ${getTime()}\n`, (err) => {
      if (err) {
        console.log(err);
      };
      console.log('restart log saved!');
  });
  res.json({ msg: 'The game has restarted.' })
})

module.exports.serverOnLogFileName = serverOnLogFileName;
export default router

