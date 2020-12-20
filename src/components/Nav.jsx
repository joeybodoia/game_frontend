import React from "react"
import {Link, Route} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {

    const { state, dispatch } = useAppState()


    return(
        <header>
            <h1>App title</h1>
            <nav>
                {!state.token ? (<><Link to="/"><div>Home</div></Link><Link to="/auth/signup"><div>Sign up</div></Link>
                <Link to="/auth/login"><div>Log in</div></Link></>) : null}
                {state.token ? <div onClick={() => {
                    dispatch({type: "logout"})
                    props.history.push("/")
                }}>Logout</div> : null}
                {state.token ? <><Link to="/game"><div>Game</div></Link></> : null}


            </nav>
        </header>
    )
}

export default Nav