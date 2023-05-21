import React from 'react'
import styles from './BetsForGame.module.css'

interface BetForGame{
    userId:number,
    betValue:number,
    autoStopKef?:number
}

interface IBetsForGame{
    betsForGame:BetForGame[]
}

const BetsForGame:React.FC<IBetsForGame>=(props)=> {
  return (
    <div>
        {props.betsForGame.map((bet)=>{
            return <div key={bet.userId} className={styles.previousKef}>
                Ставка {bet.betValue} 
            </div>
        })}
    </div>
  )
}

export default BetsForGame