import React from 'react'


const SnakeFood = (props) => {

    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }



    return(
        <div className="snakeFood" style={style}></div>
    )
}

export default SnakeFood