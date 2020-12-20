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
    console.log("reset State")

    const direction = {
        direction: "DOWN"
    }

    const snakeFoodState = {
        snakeFood: randomizeSnakeFood()
    }

    const [directionState, setDirectionState] = React.useState(direction)

    const [foodState, setFoodState] = React.useState(snakeFoodState)

    const [state, setState] = React.useState(snakeState)
    console.log("reset State")

    React.useEffect(() => {
        setInterval(() => {
            snakePath()
        }, 400);
    }, [])



    // React.useEffect(()=> {
    //     snakePath()
    // }, [])


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


    const snakePath = () => {
        let dots = [...state.snakeDots]
        let finalDots = dots
        console.log("original finalDots =" + finalDots)
        let head = finalDots[dots.length-1]
        let head2 = [head[0],head[1]]
        console.log("head2 =" + head2)
        console.log("starting head =" + head)
        
        // console.log("hello")
        if (directionState.direction == "LEFT") {
            head = [head[0]-3, head[1]]
            console.log("LEFT")
        } else if (directionState.direction == "UP") {
            head = [head[0], head[1]-3]
            console.log("UP")
        } else if (directionState.direction == "RIGHT") {
            head = [head[0]+3, head[1]]
            console.log("RIGHT")
        } else if (directionState.direction == "DOWN") {
            console.log("before head = " + dots)
            head2[0] = head[0]
            head2[1] += 3
            console.log("head =" + head)
            console.log("DOWN")
        }
        // console.log("goodbye")
        console.log("before push = " + finalDots)
        finalDots.push(head2)
        console.log("push =" + finalDots)
        finalDots.shift()
        console.log("final dots =" + finalDots)
        setState({
            snakeDots: finalDots
        })
        console.log(state)
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


