import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import MainProvider from '@/layouts/MainProvider'
import type { AppProps } from 'next/app'
import { authActions, balanceActions, wrapper } from '@/redux/store'
import {useDispatch } from 'react-redux'
import { useEffect } from 'react'
import isValidCurrentUser from '@/helpers/isValidCurrentUser'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { IUser } from '@/interfaces'

const App=function({ Component, pageProps }: AppProps) {
  const dispatch=useAppDispatch()
  //инициализируем нужные состояния если есть юзер
  useEffect(()=>{
    isValidCurrentUser()
    .then(res=>{return res})
    .then(isValidUser=>{
      if(isValidUser){
        dispatch(authActions.becomeAuthed())
        const isInfo=localStorage.getItem('user')
        let userInfo:IUser;
        let balance;
        if(isInfo){
          userInfo=JSON.parse(isInfo)
          balance=userInfo.balance
          dispatch(balanceActions.setBalance(userInfo.balance))
        }
      } else {
        dispatch(authActions.removeAuthed())
      }
    })
    
  },[])
  return <MainProvider><Component {...pageProps} /></MainProvider>
}

export default wrapper.withRedux(App)
