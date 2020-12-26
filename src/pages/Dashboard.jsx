import React from "react"
import {useAppState} from "../AppState.jsx"
import {Route, Link} from "react-router-dom"
import Form from "../components/Form.jsx"


const Dashboard = (props) => {

    const {state, dispatch} = useAppState()
    
    const {token, url, profile, username, user_id} = state

    console.log("user id = " + user_id)
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
        {/* <h1 style={{textAlign:"center"}}>{username}'s Profile</h1> */}
        <div className="profile">
            <div className="imageContainer">
                <h1 style={{"font-size":"3vw", "font-family": "'Kaushan Script'", "margin-top":"-0.4vw"}}>{username}'s Profile</h1>
                <img className="profilePic" src={profile.profilePicture} ></img>
            </div>
            <div className="nameContainer">
                <h2>First Name: {profile.firstName}</h2>
                <h2>Last Name: {profile.lastName}</h2>
                <h2>High Score: {profile.highScore}</h2>
            </div>
            <div className = "buttonContainer">
                <button onClick={()=> {
                    dispatch({type: "select", payload: profile})
                    props.history.push("/dashboard/edit")
                }}>Edit</button>
                <button onClick={()=> {
                    fetch(url + "/profiles/" + profile.id, {
                        method: "delete",
                        headers: {
                            Authorization: "bearer " + token 
                        }
                    })
                    .then(() => getProfile())
                }}>Delete</button>
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