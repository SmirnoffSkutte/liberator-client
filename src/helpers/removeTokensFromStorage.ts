export default function removeTokensFromStorage(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}