export interface bet
{
    userId:number,
    betValue:number,
    autoStopKef?:number
}

export interface userTakeKef
{
    userId:number,
    takeKef:number
}

export interface gameKefs
{
    gameId:number,
    gameKef:number,
}

export interface IUser
{
    userId:number,
    email:string,
    balance:number,
    avatarLink:string,
    nickname:string
}

export interface IAuthResponse 
{
    user:IUser,
    refreshToken:string,
    accessToken:string
}

export interface ITokens
{
    accessToken:string,
    refreshToken:string
}

export interface currentGamingInfo {
    
}