import React from "react"
import Snake from "./Snake.jsx"
import SnakeFood from "./snakeFood.jsx"

const Game = (props) => {



    const randomizeSnakeFood = () => {
        let x = Math.floor((Math.random()*97))
        let y = Math.floor((Math.random()*97))
        return [x,y]
    }

    const snakeState = {
        snakeDots: [
            [0,0],
            [3,0]
        ]
    }

    const direction = {
        direction: "DOWN"
    }

    const snakeFoodState = {
        snakeFood: randomizeSnakeFood()
    }

    const [directionState, setDirectionState] = React.useState(direction)

    const [foodState, setFoodState] = React.useState(snakeFoodState)

    const [state, setState] = React.useState(snakeState)


    window.addEventListener('keydown', (event) => {
        if (event.keyCode == 37) {
            console.log("left")
            setDirectionState({
                direction: "LEFT"
            })
        } else if (event.keyCode == 38) {
            console.log("UP")
            setDirectionState({
                direction: "UP"
            })
        } else if (event.keyCode == 39) {
            console.log("right")
            setDirectionState({
                direction: "RIGHT"
            })
        } else if (event.keyCode == 40) {
            console.log("DOWN")
            setDirectionState({
                direction: "DOWN"
            })
        }
    })


    const moveSnake = () => {
        let dots = [...state.snakeDots]
        let head = dots[dots.length-1]

        if (directionState.direction == "LEFT") {
            head = [head[0]-3, head[1]]
        } else if (directionState.direction == "UP") {
            head = [head[0], head[1]-3]
        } else if (directionState.direction == "RIGHT") {
            head = [head[0]+3, head[1]]
        } else if (directionState.direction == "DOWN") {
            head = [head[0], head[1]+3]
        }
        dots.push(head)
        dots.shift()
        setState({
            snakeDots: dots
        })
    }

  

    
    

    return(
        <div>
            <h1>Game Page</h1>
            <div className="gameContainer">
                <Snake snakeDots={state.snakeDots}/>
                <SnakeFood dot={foodState.snakeFood}/>
            </div>
        </div>
    )
}

export default Game


