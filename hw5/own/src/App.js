import { useEffect, useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleStart = async () => {
    await startGame()
    setHasStarted(true)
  }

  const handleReStart = async () => {
    await restart()
    setHasWon(false)
    setStatus('')
    setNumber('')
  }

  const startMenu = (
    <div>
      <button
        onClick={handleStart}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={handleReStart}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async (number) => {
    console.log('click');
    try{
      let statusFromServer = await guess(number)
      console.log('result: '+statusFromServer)
      setStatus(statusFromServer);
      if (statusFromServer==='Equal') setHasWon(true)
    } catch(error){
      console.log(error);
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={()=>handleGuess(number)}
        disabled={!number}
      >
        guess!
      </button>
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
