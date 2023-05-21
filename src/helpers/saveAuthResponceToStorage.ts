import { IAuthResponse } from "@/interfaces";

export default function saveAuthResponceToStorage(responseData:IAuthResponse){
    let user=JSON.stringify(responseData.user)
    localStorage.setItem('user',user)
    localStorage.setItem('accessToken',responseData.accessToken)
    localStorage.setItem('refreshToken',responseData.refreshToken)
}