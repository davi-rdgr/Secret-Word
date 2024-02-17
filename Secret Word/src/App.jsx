// React
import { useCallback, useEffect, useState } from 'react'

// Css
import './App.css'

// Data
import { wordsList } from './data/words'

// Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategoty, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrontLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {

    // pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return { word, category }

  }, [words])

  // start secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterState()

    // pick word and pick category
    const { word, category } = pickWordAndCategory()

    // create an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    // check inf letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessesLetters) => [
        ...actualGuessesLetters, normalizedLetter
      ])
    } else {
      setWrontLetters((wrongGuessesLetters) => [
        ...wrongGuessesLetters, normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterState = () => {
    setGuessedLetters([])
    setWrontLetters([])
  }

  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {

      clearLetterState()

      // reset all states
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if (guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => actualScore += 100)

      // restart game with new word
      startGame()
    }

  }, [guessedLetters, letters, startGame])

  // game over - start the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategoty={pickedCategoty}
        leters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )


}

export default App