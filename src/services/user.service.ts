import axiosInterceptor from "@/http/interceptors"
import { useAppDispatch } from "@/redux/reduxHooks"
import store, { balanceActions } from "@/redux/store"
import axios, { AxiosError } from "axios"
import { toastr } from "react-redux-toastr"

export const userService={
    async changeUserBalance(userId:number,changeBalance:number){
        const reqBody={
            userId:userId,
            changeBalance:-changeBalance
        }
        try{
            axiosInterceptor.post('/user/update-balance',reqBody)
            .then(res=>{
              store.dispatch(balanceActions.changeBalance(-changeBalance))
            // dispatch(balanceActions.changeBalance(changeBalance))
            })
        } catch(error:AxiosError | any){
			if (axios.isAxiosError(error))  {
				// Access to config, request, and response
				toastr.error('Ошибка баланса',error.response?.data.message)
			  } else {
				console.log(error)
			  }
		}
    }

}