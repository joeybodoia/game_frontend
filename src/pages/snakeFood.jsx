import React from "react"


const SnakeFood = (props) => {

    return(
        <div style={{"left":`${props.foodSquare[0]}%`, "top":`${props.foodSquare[1]}%`, "position": "absolute", "height":"4%", "width":"4%", "background-color":"red", "border":"1px solid purple", "z-index":"1"}}></div>
    )
}


export default SnakeFood