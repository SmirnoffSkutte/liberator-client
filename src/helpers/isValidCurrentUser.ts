import axiosInterceptor, { axiosClassic } from "@/http/interceptors"
import checkStorageTokens from "./checkStorageTokens"
import saveTokensToStorage from "./saveTokensToStorage";
import { ITokens, IUser } from "@/interfaces";

const isValidCurrentUser=async function(){
    const user=localStorage.getItem('user')
    if(!user){
        return false
    }
    let refreshToken;
    const tokens=checkStorageTokens()
    if(tokens){
        refreshToken=localStorage.getItem('refreshToken')
    } else {
        return false
    }
    const refreshedTokens=await axiosClassic.post<ITokens>('/auth/refresh',{
        refreshToken:refreshToken
    }).then(res=>{return res.data}).catch(err=>{
        console.log('refreshingTokensError from isValidCurrentUser')
    })

    const userInfo:IUser=JSON.parse(user)
    const refreshedUserInfo=await axiosInterceptor.get<IUser>(`/user/byId/${userInfo.userId}`)
    .then(res=>{return res.data}).catch(err=>{
        console.log('refreshingUserInfo from isValidCurrentUser')
    })

    if(refreshedTokens && refreshedUserInfo){
        saveTokensToStorage(refreshedTokens.accessToken,refreshedTokens.refreshToken)
        localStorage.setItem('user',JSON.stringify(refreshedUserInfo))
        return true
    } else {
        return false
    }
}

export default isValidCurrentUser