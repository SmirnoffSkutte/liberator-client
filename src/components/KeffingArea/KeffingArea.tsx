import React, {useEffect, useState } from 'react'
import styles from './KeffingArea.module.css'
import { useAppSelector } from '@/redux/reduxHooks'

interface gameProps {
    currentKef:number,
    isGameLoading:boolean,
    currentLoadingProgress:number,
    isGameTakingBets:boolean,
    isGameStarted:boolean,
    isGameEnded:boolean,
}

type areaState = 'afk' | 'loading' | 'gaming' | 'unknown'

const KeffingArea:React.FC<gameProps>=(props:gameProps)=>{
  const [rocketImage,setRocketImage]=useState<string>('../../../saturn-v-space.gif')
  const [areaState,setAreaState]=useState<areaState>('afk')
  // const load=props.currentLoadingProgress
  // const isGameLoading=props.isGameLoading
  // const isGameTakingBets=props.isGameTakingBets
  // const isGameStarted=props.isGameStarted
  // const isGameEndedState=props.isGameEnded
  // const kef=props.currentKef
  // const [kef,setKef]=useState<number>(props.currentKef)
  // const [load,setLoad]=useState<number>(props.currentLoadingProgress)

  const [load,setLoad]=useState<number>(props.currentLoadingProgress)
  const [isGameLoading,setIsGameLoading]=useState<boolean>(props.isGameLoading)
  const [isGameTakingBets,setIsGameTakingBets]=useState<boolean>(props.isGameTakingBets)
  const [isGameStarted,setIsGameStarted]=useState<boolean>(props.isGameStarted)
  const [isGameEndedState,setIsGameEndedState]=useState<boolean>(props.isGameEnded)
  const [kef,setKef]=useState<number>(props.currentKef)

  useEffect(()=>{
    setIsGameTakingBets(props.isGameTakingBets)
  },[props.isGameTakingBets])
  useEffect(()=>{
    setIsGameLoading(props.isGameLoading)
  },[props.isGameLoading])
  useEffect(()=>{
      setLoad(props.currentLoadingProgress)
  },[props.currentLoadingProgress])
  useEffect(()=>{
    setIsGameStarted(props.isGameStarted)
  },[props.isGameStarted])
  useEffect(()=>{
    setKef(props.currentKef)
  },[props.currentKef])
  useEffect(()=>{
    setIsGameEndedState(props.isGameEnded)
  },[props.isGameEnded])
  useEffect(()=>{
    // if(!isGameTakingBets && !isGameLoading && !isGameEndedState && isGameStarted){
    //   setAreaState('gaming')
    // }
    if(isGameStarted){
      setAreaState('gaming')
    }
    if(isGameTakingBets && isGameLoading && !isGameStarted && !isGameEndedState){
      setRocketImage('../../../saturn-v-space.gif')
      setAreaState('loading')
    }
    if(isGameTakingBets && !isGameLoading){
      setAreaState('afk')
    }
    if(isGameEndedState){
        crashRocket()
        setKef(0)
        setLoad(0)
    }
  },[isGameTakingBets,isGameLoading,isGameEndedState,isGameStarted])

  // if(isGameStarted && !isGameEndedState){
  //   setKef(kef)
  // }
  // if(!isGameTakingBets && !isGameLoading && !isGameEndedState && isGameStarted){
  //   setAreaState('gaming')
  // }
  // if(isGameTakingBets && isGameLoading && !isGameStarted && !isGameEndedState){
  //   setAreaState('loading')
  // }
  // if(isGameTakingBets && !isGameLoading){
  //   setAreaState('afk')
  // }
  // if(isGameEndedState){
  //   setKef(0)
  //   setLoad(0)
  // }

  const crashRocket=function(){
    setRocketImage("../../../Ws1o.gif")
    // setTimeout(()=>{
    //   // setKef(0)
    //   setRocketImage('../../../saturn-v-space.gif')
    // },2000)
  }

  const renderSwitch=function(areaState:areaState){
    switch(areaState){
      case 'afk':
        return <div style={{backgroundImage:"url('../../../space.jpg')"}} className={styles.keffingBlockLoading}>
        <div className={styles.loadingBlock}>
          <div className={styles.loadingPhrase}>Ожидаем игроков...</div>
        </div>
        </div>
      
      case 'loading':
        return <div style={{backgroundImage:"url('../../../space.jpg')"}} className={styles.keffingBlockLoading}>
        <div className={styles.loadingBlock}>
          <div className={styles.loadingPhrase}>Собираем ставки...</div>
          <progress max="10" value={load}></progress>
        </div>
        </div>

      case 'gaming':
        return <div style={{backgroundImage:'url(../../../space.jpg)'}} className={styles.keffingBlock}>
          <div style={{color:'white'}}>{kef}</div>
          <img className={styles.rocketGif} height={170} width={170} src={rocketImage}></img>
        </div>
      
      case 'unknown':
        return <div style={{backgroundImage:"url('../../../space.jpg')"}} className={styles.keffingBlockLoading}>
        <div className={styles.loadingBlock}>
          <div className={styles.loadingPhrase}>Загрузка игр...</div>
        </div>
        </div>

    }
  }
  return (
    <div>
      {/* <button onClick={()=>{crashRocket()}}>animate</button> */}
      {renderSwitch(areaState)}
    </div>
  )
}

export default KeffingArea