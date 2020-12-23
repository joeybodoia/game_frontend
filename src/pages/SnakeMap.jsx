import React from 'react'


const SnakeMap = (props) => {

    return(
        <div>
        {props.snakeSquares.map((square, key) => {
          return(
            <div style={{"position":"absolute", "width":"4%", "height":"4%","background-color": "purple","border":"1px solid black", "left":`${square[0]}%`, "top":`${square[1]}%`, "z-index":"2"}} key={key}></div>
          )
        })}
        </div>
    )
  }


  export default SnakeMap