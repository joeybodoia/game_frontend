
import React from "react"
import {useAppState} from "../AppState.jsx"
import SnakeMap from "./SnakeMap.jsx"
import SnakeFood from "./snakeFood.jsx"
import { gameInterval } from "./GameInterval.jsx"

const Game = (props) => {

    // pass in appState so I can update highscore for the user's profile
    const { state } = useAppState()

    const {profile, token, url, user_id} = state


    //   set initial states for snake, food, direction, speed, score, and gameOver
    const [snakeState, setSnakeState] = React.useState([[4,0],[8,0]])
    const [foodState, setFoodState] = React.useState([8,8])
    const [directionState, setDirectionState] = React.useState([4,0])
    const [speedState, setSpeedState] = React.useState(null)
    const [scoreState, setScoreState] = React.useState(0)

    const randomizeFood = () => {
        let x = Math.floor((Math.random()*96)) //needs to be a multiple of two
        let y = Math.floor((Math.random()*96)) //needs to be a multiple of two
        while (x%4 != 0 || y%4 != 0){
          x = Math.floor((Math.random()*96)) 
          y = Math.floor((Math.random()*96))
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
        setSnakeState([[8,0],[4,0]])
        setFoodState([8,8])
        setDirectionState([4,0])
        setSpeedState(280)
        setScoreState(0)
    }

    // endGame function to be called when end game button is clicked
    const endGame = () => {
        setSpeedState(null)
    }

    const updateScore = () => {
      fetch(url + "/profiles/" + profile.id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
        },
        body: JSON.stringify({
            highScore: scoreState
        }),
      }).then((response) => response.json())
      fetch(url + "/users/" + user_id, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
        },
        body: JSON.stringify({
            highscore: scoreState
        }),
    }).then((response) => response.json())
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
        // create a copy of the snakeState in order to create the newHead in order to make the snake "move"
        const snakeStateCopy = JSON.parse(JSON.stringify(snakeState))

        // create a variable for the new head that will be added onto the snake body based on direction
        const newHead = [snakeStateCopy[0][0] + directionState[0], snakeStateCopy[0][1]+directionState[1]]
        
        // Check if snake runs into its own body
        for (let i =0;i<snakeStateCopy.length;i++){
          if (newHead[0] == snakeStateCopy[i][0] & newHead[1] == snakeStateCopy[i][1]){
              setSpeedState(null)
              updateScore()
          } 
        }

        //add the new head onto the snakeStateCopy
        snakeStateCopy.unshift(newHead)  

        // if the newhead square is equal to the food square then increase the speed and randomize the food position
        if (newHead[0] == foodState[0] && newHead[1] == foodState[1]){
          setScoreState(scoreState+10)
          if (speedState >200) {
            setSpeedState(speedState-50)
          } else if (speedState <= 200 && speedState > 100){
            setSpeedState(speedState-20)
          } else if (speedState <= 100 && speedState > 20) {
            setSpeedState(speedState-2)
          } 
          setFoodState(randomizeFood())       
        } 

        //delete the tail from the snakeStateCopy if the newhead isn't equal to the food state
        if (newHead[0] != foodState[0] || newHead[1] != foodState[1]) {
          snakeStateCopy.pop()
        }
        
        // if the snake goes off of the game board then end the game and update the profile highscore and user highscore if necessary
        if (snakeStateCopy[0][0] > 96 || snakeStateCopy[0][1] > 96 || snakeStateCopy[0][0] < 0 || snakeStateCopy[0][1] < 0){
          setSpeedState(null)
          if (scoreState > profile.highScore){
            updateScore()
        }
        }
        
        setSnakeState(snakeStateCopy)
      }
    
    
      gameInterval(() => runGame(), speedState)


  return (
    <div className="App">
    <div style={{"height":"600px", "width":"80%", "margin-left":"auto", "margin-right":"auto", "margin-top":"1.2vw"}} role="button" tabIndex="0" onKeyDown = {event => arrowKeyListeners(event)}>
    <div style={{"height":"3.5vw","display":"flex", "justifyContent":"flex-start", "margin-bottom":"1vw","margin-top":"2.4vw", "alignItems":"center"}}>
      <h1 style={{"font-size":"4vw", "color":"red", "margin-right":"28.5%"}}>Score: {scoreState}</h1>
      <button className="gameButton" onClick={startGame}>Start Game</button>
      {/* <button onClick={endGame}>End Game</button> */}
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