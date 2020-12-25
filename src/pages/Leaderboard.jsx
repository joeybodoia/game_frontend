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
        // console.log(users)
        <div>
            {users.map((user)=> {
                return(
                    <div className="users" key={user.id}>
                        <h1 style={{color:"white"}}>{user.username}:{user.highScore>0 ? user.highScore :0}</h1>
                    </div>
                )
            })}
        </div>
    )


    return(
        <div>
            <h1 style={{color:"white"}}>Leaderboard</h1>
            <div>
                {users ? loadedUsers(): <h1>Loading...</h1>}
            </div>
        </div>
    )
}

export default Leaderboard