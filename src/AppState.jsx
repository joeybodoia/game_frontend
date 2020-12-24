import React, { useReducer, useContext } from "react"


///////////////////////////
// Initial State
///////////////////////////

const initialState = {
    // url: "https://jb-rails-game-backend.herokuapp.com",
    url: "https://jb-snake-backend.herokuapp.com",
    token: null,
    username: null, 
    profile: null,
    new: {
        firstName: "",
        lastName: "",
        profilePicture: ""
    },
    edit:{
        id:0,
        firstName: "",
        lastName: "",
        profilePicture: ""
    }

}


////////////////////////////
// Reducer
////////////////////////////

// action = {type:"string", payload: }
const reducer = (state, action) => {
    let newState

    switch(action.type){
        case "auth":
            newState = { ...state, ...action.payload}
            return newState
            break
        case "logout":
            newState = {...state, token:null, username:null}
            window.localStorage.removeItem("auth")
            return newState
            break
        case "getProfile":
            newState = {...state, profile: action.payload}
            return newState
            break
        case "select":
            newState = {...state, edit: action.payload}
            return newState
            break
        default:
            return state
            break
    }
}

////////////////////////////
// AppContext
////////////////////////////
const AppContext = React.createContext(null)


///////////////////////////
// AppState Component
///////////////////////////

export const AppState = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return <AppContext.Provider value={{state,dispatch}}>{props.children}</AppContext.Provider>

}


///////////////////////////
// useAppState hook
///////////////////////////

export const useAppState = () => {
    return React.useContext(AppContext)
}

