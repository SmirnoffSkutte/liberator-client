import { PayloadAction, createSlice} from '@reduxjs/toolkit'

// Define a type for the slice state
interface balanceState {
    balance: number,
}

// Define the initial state using that type
const initialState:balanceState={
    balance:0,
};

// create a slice 
export const balanceSlice= createSlice({
    name:"balance",
    initialState,
    reducers:{
        //будет работать как с плюсом,так и с минусом
         changeBalance:(state:balanceState,action:PayloadAction<number>)=>{
            state.balance=state.balance+action.payload
         },
         setBalance:(state:balanceState,action:PayloadAction<number>)=>{
            state.balance=action.payload
         }

    },
})