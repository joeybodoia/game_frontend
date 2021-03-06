import React from "react"
import {useAppState} from "../AppState.jsx"

const Form = (props) => {

    const { state, dispatch } = useAppState()

    const {token} = state

    const action = props.match.params.action

    const [formData, setFormData] = React.useState(state[action])


    const actions = {
        new: () => {
            return fetch(state.url + "/profiles", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        
        },
        edit: () => {
            return fetch(state.url + "/profiles/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "bearer " + token
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json())
        
        }
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        actions[action]().then((data) => {
            props.getProfile()
            props.history.push("/dashboard")
        })
    }

    return(
        <div className="form">
            <form className="formContainer" onSubmit={handleSubmit}>
                <input className="formInput" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name"/>
                <input className="formInput" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input className="formInput" type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="profile picture (image address)" />
                <input className="formButton" type="submit" value={action}/>
            </form>
        </div>
    )
}

export default Form