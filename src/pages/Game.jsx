
import React from "react"
import { gameInterval } from "./GameInterval.jsx"

const Game = (props) => {



  const canvasRef = React.useRef(null)


  const [snakeState, setSnakeState] = React.useState([
                [20,7],
                [20,8]
            ])


  const [foodState, setFoodState] = React.useState([8,3])
  const [directionState, setDirectionState] = React.useState([1,0])
  const [speedState, setSpeedState] = React.useState(null)
  const [gameOver, setGameOver] = React.useState(false)

  const startGame = () => {
    setSnakeState([[20,7],[20,8]])
    setFoodState([8,3])
    setDirectionState([1,0])
    setSpeedState(1000)
    setGameOver(false)
  }

  const endGame = () => {
    setSpeedState(null)
    setGameOver(true)
  }

  // event listener to change the direction state when arrow keys are pushed
  window.addEventListener('keydown', (event) => {

    if (event.keyCode == 37) {
        console.log("left")
        setDirectionState([-1,0])
    } else if (event.keyCode == 38) {
        console.log("UP")
        setDirectionState([0,-1])
    } else if (event.keyCode == 39) {
        console.log("right")
        setDirectionState([1,0])
    } else if (event.keyCode == 40) {
        console.log("DOWN")
        setDirectionState([0,1])
    }
  })


  // const checkOutofBounds = (snake) => {
  //   if (snake )
  // }

  const runGame = () => {
    const snakeStateCopy = JSON.parse(JSON.stringify(snakeState))
    console.log("snake state =" + snakeStateCopy)
    const newHead = [snakeStateCopy[1][0] + directionState[0], snakeStateCopy[1][1]+directionState[1]]
    console.log("snake head =" + newHead)
    snakeStateCopy.push(newHead)   //add the new head onto the snakeStateCopy
    snakeStateCopy.shift()         //delete the tail from the snakeStateCopy
    console.log(snakeStateCopy)
    setSnakeState(snakeStateCopy)
    console.log("snakeStateCopy[0]= " + snakeStateCopy[0])
    if (snakeStateCopy[1][0] >= 28 || snakeStateCopy[1][1] >= 28 || snakeStateCopy[1][0] < 1 || snakeStateCopy[1][1] < 1) {
      console.log("game over")
      endGame()
    }
  }





  React.useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.setTransform(10, 0, 0, 10, 0, 0)
    context.clearRect(0, 0, 500, 500)
    context.fillStyle = "green"
    snakeState.forEach(([x,y]) => context.fillRect(x,y, 2, 1))
    context.fillStyle = "red"
    context.fillRect(foodState[0], foodState[1], 2, 1)
  }, [snakeState, foodState, gameOver])


  gameInterval(() => runGame(), speedState)
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <div>
        <canvas style={{border: "1px solid black", width:"500px", height:"500px"}} ref={canvasRef}/>
        <button onClick={startGame}>Start Game</button>
        <button onClick={endGame}>End Game</button>
      </div>
    </div>
  );
}


export default Game;