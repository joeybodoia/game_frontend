
import React from "react"
import SnakeMap from "./snakeMap.jsx"
import SnakeFood from "./SnakeFood.jsx"
// import { gameInterval } from "./GameInterval.jsx"

const Game = (props) => {

    // create key value pairs where keys are the keyCode for each arrow and the value is the change in [x,y] cooridnates moving that direction
    const directions = {
        37: [-2, 0],
        38: [0, -2], 
        39: [2, 0], 
        40: [0, 2], 
      };

    //   set initial states for snake, food, direction, speed, score, and gameOver
    const [snakeState, setSnakeState] = React.useState([[2,0],[4,0]])
    const [foodState, setFoodState] = React.useState([8,8])
    const [directionState, setDirectionState] = React.useState([2,0])
    const [speedState, setSpeedState] = React.useState(null)
    const [scoreState, setScoreState] = React.useState(0)

     // startGame function to be called when the start game button is clicked
    const startGame = () => {
        setSnakeState([[2,0],[4,0]])
        setFoodState([8,8])
        setDirectionState([2,0])
    }

    // endGame function to be called when end game button is clicked
    const endGame = () => {
        setSpeedState(null)
    }

    const arrowKeyListeners = ({ keyCode }) => {
        if (keyCode >= 37 && keyCode <= 40) {
            setDirectionState(directions[keyCode])
        } 
    }


  return (
    <div className="App">
    <h1 style={{"margin-bottom":"100px"}}>Snake Game</h1>
    <button onClick={startGame}>Start Game</button>
    <div style={{"height":"500px", "width":"500px", "border":"2px solid black", "margin-left":"auto", "margin-right":"auto", "position": "relative"}} role="button" tabIndex="0" onKeyDown = {event => arrowKeyListeners(event)} >
       <SnakeMap snakeSquares = {snakeState}/>
       <SnakeFood foodSquare = {foodState}/>
    </div>
    <button onClick={endGame}>End Game</button>
   </div>
  );
}


export default Game;