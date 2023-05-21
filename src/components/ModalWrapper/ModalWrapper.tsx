import React, { FC, ReactNode } from 'react'
import modalStyles from './modal.module.css'

interface ModalProps {
    children:ReactNode
    closingState:boolean
}

const ModalWrapper:FC<ModalProps> = (props: ModalProps) => {
    let closingState=props.closingState
    let children=props.children
  return (
    <>
    {children && closingState ? (
        null
    ) : (
        <div className={modalStyles.backGround}>
            <div className={modalStyles.modalContainer}>
                {children}
            </div>
        </div>
    )}
    </>
  )
}

export default ModalWrapper