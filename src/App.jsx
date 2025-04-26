import { useState,useRef, useEffect } from "react";
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
  const [num,setNum] = useState(() => generateAllNewDices())
  const [roll,setRoll] = useState(0)
  const [seconds, setSeconds] = useState(0);
  const buttonRef = useRef(null)

  const GameWon = num.every(value => value.isHeld)  && num.every(value=> value.value === num[0].value)

  useEffect(() => {
    if(!GameWon){
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1); 
      }, 1000);
      return () => clearInterval(interval);
    }
    
  }, [GameWon]);

  useEffect(()=>{
    if(GameWon){
      buttonRef.current.focus()
    }
  },[GameWon])
  
  
  function generateAllNewDices(){
    return new Array(10) 
        .fill(0)
        .map(()=> ({
          value : Math.ceil(Math.random()*6) ,
          isHeld:false,
          id:nanoid()
        }))
  }

  
  function rollDice(){
    if (!GameWon){
      setNum(oldDie=> oldDie.map(die=> 
        die.isHeld? die : {...die,value: Math.ceil(Math.random()*6) }
      ))

      setRoll(prevRoll=> prevRoll +1)
    }  else {
      setNum(generateAllNewDices)
      setRoll(0)
      setSeconds(0)
    }
    

  }

  

  function handleClick(id){
    console.log(id);
    setNum(oldDie => {
      return oldDie.map(die=>{
        return die.id === id?
          {...die,isHeld:!die.isHeld}:
          die
      })
    })
  }
  
  const diceElements = num.map(item => (
      <Die 
        key={item.id} 
        number = {item.value} 
        value = {item.value}
        isHeld = {item.isHeld} 
        handleClick={handleClick}
        id = {item.id}
      />
      )
  );

  return(
    <>
      <main>
        {GameWon && <Confetti/>}
        <div className="title">
          <h1>🎲 TENZIES 🎲</h1>  
          <p>Roll until all the dice are the same. Click each dice to freeze it at its current value between rolls. May the odds be ever in your favour 👀</p>
        </div>
        <div className="buttonContainer">
          {diceElements}
        </div>

        <div className="rollButton">
          <button ref={buttonRef} onClick={rollDice}>
            {GameWon? "NEW GAME" :"ROLL"}
          </button>
        </div>

        <p>You rolled {roll} times &emsp; Your time : {seconds}seconds</p>
        
      </main>
    </>
  )
}
