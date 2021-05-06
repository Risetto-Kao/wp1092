let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (forceRestart || typeof number === 'undefined') { 
    number = Math.floor(Math.random() * 98) + 2;
    console.log(
      `
      The random number is ${number}\n
      ---\n
      ForceRester is ${forceRestart}\n
      ---\n
      Typeof number is ${number}\n
      -----------`
      )
  }

  return number
}

export default getNumber
