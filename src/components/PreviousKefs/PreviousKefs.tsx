import React from 'react'
import styles from './PreviousKefs.module.css'
import { gameKefs } from '@/interfaces'

interface previousKefsList {
    previousKefs:gameKefs[] | []
}


const PreviousKefs:React.FC<previousKefsList>=(props)=> {
  return (
    <div className={styles.previousKefsLine}>
        {props.previousKefs.map((prevKef,index)=>{
            return <div key={prevKef.gameId} className={styles.previousKef}>{prevKef.gameKef}</div>
        })}
    </div>
  )
}

export default PreviousKefs