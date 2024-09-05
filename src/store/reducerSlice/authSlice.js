import { createSlice } from "@reduxjs/toolkit"

 const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        user:false,
    },
    reducers:{
        handleSetUser:(state, aciton)=>{
            state.user = aciton.payload
        }
    }
})

export const {handleSetUser} = authSlice.actions;
export default authSlice;
