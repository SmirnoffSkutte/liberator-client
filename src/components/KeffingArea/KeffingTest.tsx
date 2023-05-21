import React, { FC, useEffect, useState } from 'react'

interface testProps{
    kef:number
}

const KeffingTest:FC<testProps>=function(props) {
    //Это работает
    const [kef,setKef]=useState<number>(props.kef)
    useEffect(()=>{
        setKef(props.kef)
    },[props])
  return (
    <h1>{kef}</h1>
  )
}

export default KeffingTest