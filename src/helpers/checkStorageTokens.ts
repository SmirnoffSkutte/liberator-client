export default function checkStorageTokens(){
    const isAccessToken=localStorage.getItem('accessToken');
    const isRefreshToken=localStorage.getItem('refreshToken');
    if(isAccessToken!==null && isRefreshToken!==null){
        return true
    } else {
        return false
    }
    
}