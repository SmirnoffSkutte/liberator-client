import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/index.module.css'
import checkboxStyles from '@/styles/checkbox.module.css'
import { Socket, io } from 'socket.io-client'
import { Profiler, use, useEffect, useMemo, useState } from 'react'
import { API_URL, API_WS, APP_NAME, APP_URL } from '@/config'
import PreviousKefs from '@/components/PreviousKefs/PreviousKefs'
import KeffingArea from '@/components/KeffingArea/KeffingArea'
import BetsForGame from '@/components/BetsForGame/BetsForGame'
import { bet , currentGamingInfo, gameKefs } from '@/interfaces'
import { toastr } from 'react-redux-toastr'
import { useAppSelector } from '@/redux/reduxHooks'
import Link from 'next/link'
import { userService } from '@/services/user.service'
import KeffingTest from '@/components/KeffingArea/KeffingTest'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const isBrowser = typeof window !== "undefined";
  const isAuthedUser=useAppSelector((state)=>state.auth.authed)
  const userBalance=useAppSelector((state)=>state.balance.balance)
  const [betValue,setBetValue]=useState<number>(100)
  const [isAutoKef,setIsAutoKef]=useState<boolean>(false);
  const [autoKef,setAutoKef]=useState<number>(2);

  const [gameTakingBets,setGameTakingBets]=useState<boolean>(false)
  const [gameStarting,setGameStarting]=useState<boolean>(false)
  const [gameEnded,setGameEnded]=useState<boolean>(false)
  const [gameIsLoading,setIsGameLoading]=useState<boolean>(false)
  const [currentGameLoading,setCurrentGameLoading]=useState<number>(0)
  const [gameKef,setGameKef]=useState<number>(0)
  const [isRendered,setIsRendered]=useState<boolean>(false)

  let accessToken:string | null;
  if(isBrowser && isAuthedUser){
    accessToken=localStorage.getItem('accessToken')
  }

  const socket = useMemo(() => isBrowser ? 
  (isAuthedUser ? 
    (io(`${API_WS}`,{auth:{token:accessToken},transports: ['websocket']})) : (io(`${API_URL}`,{transports: ['websocket']}))) 
  : null
  , [isAuthedUser]);

  let usersBets:bet[]=[]
  let lastKefs:gameKefs[]=[{gameId:1,gameKef:2.24},{gameId:2,gameKef:3.34}
    ,{gameId:3,gameKef:3.34},{gameId:4,gameKef:3.34},{gameId:5,gameKef:3.34},{gameId:6,gameKef:3.34}
    ,{gameId:7,gameKef:3.34},{gameId:8,gameKef:3.34},{gameId:9,gameKef:3.34},{gameId:10,gameKef:3.34}]

  useEffect(()=>{
    setIsRendered(true)
  },[])
  
  if(socket&&isRendered){
    socket.on('initializeCurrentGamingInfo',(currentGamingInfo:currentGamingInfo)=>{

    })

    socket.off('gameTakingBets').on('gameTakingBets',()=>{
      setGameTakingBets(true)
      console.log('gameTakingBets')
    })
    socket.off('gameClosingBets').on('gameClosingBets',()=>{
      setGameTakingBets(false)
      console.log('gameClosingBets')
    })
    //currentLoad от 0 до 10 приходит
    socket.off('currentLoadingProgress').on('currentLoadingProgress',(currentLoad:number)=>{
      if(currentLoad==1){
        setIsGameLoading(true)
      }
      setCurrentGameLoading(currentLoad)
      console.log(`currentLoadingProgress ${currentLoad}`)
    })
    socket.off('gameStarting').on('gameStarting',()=>{
      setIsGameLoading(false)
      setGameStarting(true)
      console.log('gameStarting')
    })
    socket.off('keffing').on('keffing',(kef:number)=>{
      const notFloatKef=Number(kef.toFixed(3))
      setGameKef(notFloatKef)
      console.log(kef)
    })
    socket.off('gameEnded').on('gameEnded',async ()=>{
      console.log('gameEnded')
      setGameEnded(true)
      setTimeout(()=>{
        setGameEnded(false)
        setGameStarting(false)
        setGameKef(0)
        setCurrentGameLoading(0)
      },2000)
    })

    socket.off('newBet').on('newBet',(newBet:bet)=>{
      console.log(newBet)
      usersBets.push(newBet)
    })
  }
  
  const betToGame=async function() {
    if(isAuthedUser){
      let userInfo;
      let user=localStorage.getItem('user')
      if(user){
        userInfo=JSON.parse(user)
        let bet={
          userId:userInfo.userId,
          betValue:betValue
        }
        if(socket){
          userService.changeUserBalance(userInfo.userId,betValue)
          socket.emit("betToGame",bet)
        }
        } else {
          toastr.error('Сделать ставку','Нет ws соединения')
        }
      }
  }

  const minusBetValueFunc=function(){
    if(!(betValue-5<0)){
      setBetValue(betValue-5)
    } else {
      setBetValue(0)
    }
  }

  const plusBetValueFunc=function(){
    if(!(betValue+5>userBalance)){
      setBetValue(betValue+5)
    } else {
      setBetValue(userBalance)
    }
  }
 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.gamingBlock}>
          <PreviousKefs previousKefs={lastKefs}/>
          <KeffingArea isGameStarted={gameStarting} currentLoadingProgress={currentGameLoading} isGameLoading={gameIsLoading} isGameEnded={gameEnded} isGameTakingBets={gameTakingBets} currentKef={gameKef}/>
          {/* <GamingControls/> */}
          {/* <KeffingTest kef={gameKef}/> */}
          <div className={styles.gamingControls}>

            <div className={styles.betValueSelectorBlock}>
              <div className={styles.controllersHeader}>Ставка ₽</div>
              <div className={styles.changeValueSelectorBlock}>
                <div onClick={()=>minusBetValueFunc()} className={styles.znak}>-</div>
                <input type='number' value={betValue} onChange={(evt)=>setBetValue(parseInt(evt.target.value))} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} onPaste={(evt)=>evt.preventDefault()} className={styles.betValueInput}></input>
                <div onClick={()=>plusBetValueFunc()} className={styles.znak}>+</div>
              </div>
              <div className={styles.fastValues}>
                <div className={styles.fastValue}>+10</div>
                <div className={styles.fastValue}>+100</div>
                <div className={styles.fastValue}>Max</div>
              </div>
            </div>
            {isAuthedUser ? (
              <div onClick={()=>betToGame()} className={styles.betButton}>
                <span>Поставить</span>
              </div>
            ) : (
              <Link href={`${APP_URL}/login`}>
                <div className={styles.betButton}>
                  <span>Войти</span>
                </div>
              </Link>
            )}
            <div className={styles.autoStopBlock}>
              <div className={styles.controllersHeader}>Автостоп</div>
              <div className={styles.changeValueSelectorBlock}>
                <div className={styles.znak}>-</div>
                <input type='number' step={0.1} defaultValue={2.00} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} onPaste={(evt)=>evt.preventDefault()} className={styles.betValueInput}></input>
                <div className={styles.znak}>+</div>
              </div>
              <div className={styles.autoKefCheckBox}>
                <div className={styles.checkboxItself}>
                  <span style={{padding:5}}>Выкл</span>
                  <div>
                  <label className={checkboxStyles.toggle}>
                    <input type="checkbox"/>
                    <span className={checkboxStyles.slider}></span>
                  </label>
                  </div>
                  <span style={{padding:5}}>Вкл</span>
                </div>
              </div>
            </div>
          </div>
          <BetsForGame betsForGame={usersBets}/>
          <button
          onClick={() => console.log(socket)}
          type="button">checkSocket</button>
        </div>
        {/* <input type='number' onChange={(e)=>setBetValue(parseInt(e.target.value))}></input>
            <button onClick={()=>betToGame()}>bet value</button> */}
    </>
  )
}
