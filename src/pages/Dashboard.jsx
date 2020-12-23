import React from "react"
import {useAppState} from "../AppState.jsx"
import {Route, Link} from "react-router-dom"
import Form from "../components/Form.jsx"


const Dashboard = (props) => {

    const {state, dispatch} = useAppState()
    
    const {token, url, profile, username} = state

    const getProfile = async () => {
        const response = await fetch(url + "/profiles/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const fetchedProfile = await response.json()
        dispatch({type: "getProfile", payload: fetchedProfile})
    }

    React.useEffect(() => {
        getProfile()
    }, [])

    const loaded = () => {
        console.log(state.profile)
        return(
        <div className="dashboard">
        <h1 style={{textAlign:"center"}}>{username}'s Profile</h1>
        {/* <ul>
            {state.profile.map((pro) => (
                <div>
                    <h2>{pro.firstName}</h2>
                    <h2>{pro.lastName}</h2>
                    <img src={pro.profilePicture}></img>
                </div>
        ))}
        </ul> */}
        <div className="profile">
            <img className="profilePic" src={profile.profilePicture} ></img>
            <div className="nameContainer">
                <h2>First Name: {profile.firstName}</h2>
                <h2>Last Name: {profile.lastName}</h2>
                <h2>High Score: {profile.highScore}</h2>
            </div>
            <div className = "buttonContainer">
                <button onClick={()=> {
                    dispatch({type: "select", payload: profile})
                    props.history.push("/dashboard/edit")
                }}>Edit Profile</button>
                <button onClick={()=> {
                    fetch(url + "/profiles/" + profile.id, {
                        method: "delete",
                        headers: {
                            Authorization: "bearer " + token 
                        }
                    })
                    .then(() => getProfile())
                }}>Delete Profile</button>
                <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getProfile={getProfile}/>}/>
            </div>
        </div>
        </div>
    )}

    const newProfile = () => {
       return(
            <div>
                <Link to="/dashboard/new"><button>Create Profile</button></Link>
                <Route path="/dashboard/:action" render={(rp) => <Form {...rp} getProfile={getProfile}/>}/>
    
            </div>)
           
    }

    
    return(
        <div>
            {profile ? loaded(): newProfile()}
        </div>
    )
}

export default Dashboard