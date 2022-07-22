import "./style/style.css";
import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import { randomWord } from "./components/Words";
import image1 from "./images/1png.png";
import image2 from "./images/2png.png";
import image3 from "./images/3png.png";
import image4 from "./images/4png.png";
import image5 from "./images/5png.png";
import image6 from "./images/6png.png";
import image7 from "./images/7png.png";
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import WrongLetters from "./components/WrongLetters";

const imgStyle = {
  display: "inline-block",
  float: "left",
  height:"700px",
  width: "350px",
  marginTop: "0%",
  marginLeft: "0%",
};

let answer =  randomWord();

function App() {
  let imgs = [image1, image2, image3, image4, image5, image6, image7];
  const [current, setCurrent] = useState(imgs[0]);
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (answer.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);
  
const playAgain = () => {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    answer = randomWord();
  }

  return (
    <div className="App">
      <Header/>
      <WrongLetters 
      wrongLetters={wrongLetters}
      />
      <img src={current} alt={imgs.length} style={imgStyle} />
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} answer={answer} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
