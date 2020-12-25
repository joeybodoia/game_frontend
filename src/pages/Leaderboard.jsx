import React from "react"
import {useAppState} from "../AppState.jsx"

const Leaderboard = (props) => {

    const {state, dispatch} = useAppState()
    const {url, token, users} = state

    
    const getUsers  = async () => {
        const response = await fetch(url + "/users/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        // const response = await fetch(url + "/users")
        const users = await response.json()
        console.log(users)
        dispatch({type: "getUsers", payload: users})    
    }



    React.useEffect(() => {
        getUsers()
    }, [])

   

    const loadedUsers = () => (
        <div>
            {users.slice(0,5).map((user)=> {
                return(
                    <div className="users" key={user.id}>
                        <h1 style={{color:"white"}}>{user.username}:{user.highscore>0 ? user.highscore :0}</h1>
                        {/* <h1 style={{color:"white"}}>{user.username}:{user.highscore}</h1> */}
                    </div>
                )
            })}
        </div>
    )


    return(
        <div>
            <h1 style={{color:"white"}}>Leaderboard</h1>
            <div>
                {users ? loadedUsers(): <h1 style={{color:"white"}}>Loading...</h1>}
            </div>
        </div>
    )
}

export default Leaderboard