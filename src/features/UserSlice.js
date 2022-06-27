import {createSlice} from "@reduxjs/toolkit"
export const userSlice=createSlice(
    {
        name:"user",
        initialState:{
            user:null,
            token:null,
            isAuthenticated:false
        },
        reducers:{

            login:(state,action)=>{
                state.user=action.payload
                state.isAuthenticated=true
                state.token=action.payload.token
                localStorage.setItem("token", action.payload.token)
            },
            logout:(state)=>{
                state.user=null

            }
        }
    }
)
export const{login,logout}=userSlice.actions
export const selectUser=(state)=>state
export default userSlice.reducer