import React from "react"
import {Link, Route} from "react-router-dom"
import {useAppState} from "../AppState.jsx"

const Nav = (props) => {

    const { state, dispatch } = useAppState()


    return(
        <header>
            <nav>
                {!state.token ? (<><Link to="/"><div>Home</div></Link><Link to="/auth/signup"><div>Sign up</div></Link>
                <Link to="/auth/login"><div>Log in</div></Link></>) : null}
                {state.token ? <div onClick={() => {
                    dispatch({type: "logout"})
                    props.history.push("/")
                }}>Logout</div> : null}
                {state.token ? <><Link to="/dashboard"><div>My Profile</div></Link></> : null}
                {state.token ? <><Link to="/leaderboard"><div>Leaderboard</div></Link></> : null}
                {state.token ? <><Link to="/game"><div>Play Snake!</div></Link></> : null}
            </nav>
            <h1>Snake Game</h1>
        </header>
    )
}

export default Nav