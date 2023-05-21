import { createSlice} from '@reduxjs/toolkit'

type IStatus = 'loading' | 'resovled' | 'rejected'

// Define a type for the slice state
interface authState {
    authed: boolean,
    status:IStatus,
    isError:boolean
}

// Define the initial state using that type
const initialState:authState={
    authed:false,
    status:'loading',
    isError:false
};

// create a slice 
export const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
         becomeAuthed:(state)=>{
            state.authed=true
            state.status='resovled'
         },
         removeAuthed:(state)=>{
            state.authed=false
            state.status='resovled'
         },
    },
})