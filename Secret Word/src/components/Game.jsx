import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({ verifyLetter,
    pickedWord,
    pickedCategoty,
    leters,
    guessedLetters,
    wrongLetters,
    guesses,
    score }) => {
    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter)
        setLetter("")
        letterInputRef.current.focus()
    }
    
    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: <span className='score'>{score}</span></span>
            </p>
            <h1>Secret Word <br />
                Adivinhe a Palavra! </h1>   

            <h3 className='tip'>A dica é: <span>{pickedCategoty}</span></h3>
            <p className='paragraph'>Você ainda tem {guesses} tentativas</p>
            <div className="wordContainer">

                {leters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p className='paragraph'>Tente adivinhar uma letra da palavra: </p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='letter' maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef} />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p className='paragraph'>Letras já utilizadas: </p>
                {wrongLetters.map((letter, i) => (
                    <span className='paragraph' key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game
