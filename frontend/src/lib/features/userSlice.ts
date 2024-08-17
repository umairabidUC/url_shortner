import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface CounterState {
    userId: string,
    username: string,
    email: string,
    role_id: number,
}

// Define the initial state using that type
const initialState: CounterState = {
    userId: "",
    username: "",
    email: "",
    role_id: 0
}

export const counterSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: state => {
            if (JSON.parse(localStorage.getItem("userID") || "") !== "") {
                state.userId = JSON.parse(localStorage.getItem("userID") || "")
                state.email = JSON.parse(localStorage.getItem("email") || "")
                state.username = JSON.parse(localStorage.getItem("username") || "")
                state.role_id = JSON.parse(localStorage.getItem("role_id") || "")
            }
        },
    }
})

export const { setUser } = counterSlice.actions

export default counterSlice.reducer