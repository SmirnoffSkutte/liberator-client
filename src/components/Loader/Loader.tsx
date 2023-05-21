import React from 'react'
import styles from './Loader.module.css'
type Props = {}

export default function Loader({}: Props) {
  return (
    <div className={styles.ldsDualRing}></div>
  )
}