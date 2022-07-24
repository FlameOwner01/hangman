import React from 'react';

const Word = ({ answer, correctLetters }) => {

  return (
    <div className="word">
      {answer.split('').map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ''}
          </span>
        )
      })}
    </div>
  )
}

export default Word;