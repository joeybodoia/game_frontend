
import React from "react"
import SnakeMap from "./snakeMap.jsx"
import SnakeFood from "./SnakeFood.jsx"
// import { gameInterval } from "./GameInterval.jsx"

const Game = (props) => {


    const [snakeState, setSnakeState] = React.useState([[2,0],[4,0]])
    const [foodState, setFoodState] = React.useState([8,8])


  return (
    <div className="App">
    <h1 style={{"margin-bottom":"100px"}}>Snake Game</h1>
    <div style={{"height":"500px", "width":"500px", "border":"2px solid black", "margin-left":"auto", "margin-right":"auto", "position": "relative"}} role="button" tabIndex="0" onKeyDown = {event => arrowKeyListeners(event)}>
       <SnakeMap snakeSquares = {snakeState}/>
       <SnakeFood foodSquare = {foodState}/>
    </div>
   </div>
  );
}


export default Game;