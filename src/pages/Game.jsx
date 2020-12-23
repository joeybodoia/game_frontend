
import React from "react"
import {useAppState} from "../AppState.jsx"
import SnakeMap from "./SnakeMap.jsx"
import SnakeFood from "./SnakeFood.jsx"
import { gameInterval } from "./GameInterval.jsx"

const Game = (props) => {

    // pass in appState so I can update highscore for the user's profile
    const { state } = useAppState()

    const {profile, token, url} = state
    console.log(profile.firstName)
    console.log(token)


    //   set initial states for snake, food, direction, speed, score, and gameOver
    const [snakeState, setSnakeState] = React.useState([[4,0],[8,0]])
    const [foodState, setFoodState] = React.useState([8,8])
    const [directionState, setDirectionState] = React.useState([2,0])
    const [speedState, setSpeedState] = React.useState(null)
    const [scoreState, setScoreState] = React.useState(0)

    const randomizeFood = () => {
        let x = Math.floor((Math.random()*90)) //needs to be a multiple of two
        let y = Math.floor((Math.random()*90)) //needs to be a multiple of two
        while (x%4 != 0 || y%4 != 0){
          x = Math.floor((Math.random()*90)) 
          y = Math.floor((Math.random()*90))
        }
        return [x,y]
      }

      // create key value pairs where keys are the keyCode for each arrow and the value is the change in [x,y] cooridnates moving that direction
    const directions = {
        37: [-4, 0],
        38: [0, -4], 
        39: [4, 0], 
        40: [0, 4], 
      };


     // startGame function to be called when the start game button is clicked
    const startGame = () => {
        setSnakeState([[4,0],[8,0]])
        setFoodState([8,8])
        setDirectionState([4,0])
        setSpeedState(300)
        setScoreState(0)
    }

    // endGame function to be called when end game button is clicked
    const endGame = () => {
        setSpeedState(null)
    }

    // function to prevent the arrow keys from changing the browser viewpoint
    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
  }, false);

    // function to handle changing direction state based on arrow key keyCodes
    const arrowKeyListeners = ({ keyCode }) => {
        if (keyCode >= 37 && keyCode <= 40) {
            setDirectionState(directions[keyCode])
        } 
    }

    const runGame = () => {
        console.log("scoreState was " + scoreState)
        const snakeStateCopy = JSON.parse(JSON.stringify(snakeState))
        console.log("snake state =" + snakeStateCopy)
        const newHead = [snakeStateCopy[0][0] + directionState[0], snakeStateCopy[0][1]+directionState[1]]
        // console.log("snake head =" + newHead)
        // snakeStateCopy.push(newHead)
        snakeStateCopy.unshift(newHead)   //add the new head onto the snakeStateCopy
        // console.log("food state= " + foodState)
        // console.log("newhead = " + newHead)
        if (newHead[0] == foodState[0] && newHead[1] == foodState[1]){
        
          // console.log("score now equals " + score)
          setScoreState(scoreState+10)
          if (speedState >200) {
            setSpeedState(speedState-50)
          } else if (speedState <= 200 && speedState > 100){
            setSpeedState(speedState-20)
          } else if (speedState <= 100 && speedState > 20) {
            setSpeedState(speedState-10)
          } 
          console.log("scoreState is now " + scoreState)
          // console.log("score = " + score)
          setFoodState(randomizeFood())       //delete the tail from the snakeStateCopy if the newhead isn't equal to the food state
        } 
        if (newHead[0] != foodState[0] || newHead[1] != foodState[1]) {
          snakeStateCopy.pop()
        }
        // if (newHead[0] == foodState[0] && newHead[1] == foodState[1]) {
        //   console.log("Snake EATS FOOD BITCH")
        // }
        console.log("newHead[0] = " + newHead[0])
        console.log("food state[0] = " + foodState[0])
        console.log("newHead[1] = " + newHead[1])
        console.log("food state[1] = " + foodState[1])
        // snakeStateCopy.pop()
        // console.log(snakeStateCopy)
        setSnakeState(snakeStateCopy)
        console.log("snakeStateCopy[0][0] = " + snakeStateCopy[0][0])
        console.log("snakeStateCopy[0][1] = " + snakeStateCopy[0][1])
        console.log("snakeStateCopy[0] = " + snakeStateCopy[0])
        if (snakeStateCopy[0][0] > 96 || snakeStateCopy[0][1] > 96 || snakeStateCopy[0][0] < 0 || snakeStateCopy[0][1] < 0){
          setSpeedState(null)
          console.log("game over")
        }
        // console.log("snakeStateCopy[0]= " + snakeStateCopy[0])
        // if (scoreState > 80) {
        //   console.log("game over")
        //   endGame()
        //   if (scoreState > profile.highScore){
        //       fetch(url + "/profiles/" + profile.id, {
        //         method: "put",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: "bearer " + token
        //         },
        //         body: JSON.stringify({
        //             id:profile.id,
        //             firstName: profile.firstName,
        //             lastName: profile.lastName,
        //             profilePicture: profile.profilePicture,
        //             highScore: scoreState
        //         }),
        //     }).then((response) => response.json())
        //   }
        // }
      }
    
    
      gameInterval(() => runGame(), speedState)


  return (
    <div className="App">
    <div style={{"height":"600px", "width":"700px", "border":"2px solid white", "margin-left":"auto", "margin-right":"auto"}} role="button" tabIndex="0" onKeyDown = {event => arrowKeyListeners(event)}>
    <div style={{"height":"3.5vw","display":"flex", "justifyContent":"space-around", "border":"2px solid white", "margin-bottom":"1vw", "alignItems":"center"}}>
      <h1 style={{"font-size":"2vw", "color":"red"}}>Score: {scoreState}</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={endGame}>End Game</button>
    </div>
      <div className="gameBoard" style={{"height":"480px", "width":"480px", "border":"2px solid black", "margin-left":"auto", "margin-right":"auto", "position": "relative"}} role="button" tabIndex="0" onKeyDown = {event => arrowKeyListeners(event)} >
        <SnakeMap snakeSquares = {snakeState}/>
        <SnakeFood foodSquare = {foodState}/>
      </div>
    </div>
    
    
   </div>
  );
}


export default Game;