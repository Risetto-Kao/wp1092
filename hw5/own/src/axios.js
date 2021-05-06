import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const netWorkErrorMessage =`Error: There's some problem with net connection.`
const otherErrorMessage = `Error: There's some problem not defined, try to connect the author.` 
const startGame = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/start')
  
    return msg
  } catch (error) {
    return netWorkErrorMessage
  }

}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  const errorMessage = `Error: ${number} is not a valid number. (1 - 100)`

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
    console.log('Error in axios is: '+error);
    if (error.message === "Network Error") return netWorkErrorMessage
    if (error) return otherErrorMessage
    return errorMessage
  }
}



const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')
  
    return msg
  } catch (error) {
    return netWorkErrorMessage
  }
  
}

export { startGame, guess, restart }
