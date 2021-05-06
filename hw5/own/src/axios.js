import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  const errorMessage = `Error: ${number} is not a valid number (1 - 100)`
  // let re =  /^[0-9] .?[0-9]*/ ;
  let isValid = false;
  let re = /\d*/
 
  try {
    isValid = re.test(number)
    if (parseInt(number,10)<2||parseInt(number,10)>99) isValid = false;
    console.log(number + ' isValid? => ' + isValid)
    const {
      data: { msg }
    } = await instance.get('/guess',{ params: { number } })
    console.log({data:msg})
    return msg
  } catch (error) {
    console.log('Error in axios is: '+error)
    return errorMessage
  }
}



const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
