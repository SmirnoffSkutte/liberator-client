import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MouseEvent, useEffect, useState } from 'react'
import { API_URL, APP_NAME, APP_URL } from '@/config'
import { useRouter } from 'next/router'
import { AuthService } from '@/services/auth.service'
import { toastr } from 'react-redux-toastr'
import { useAppDispatch } from '@/redux/reduxHooks'
import { authActions, balanceActions } from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {

  const router=useRouter()
  const dispatch=useAppDispatch()
  const [email,setEmail]=useState<string>('');
  const [password,setPassword]=useState<string>('');

    async function loginEmail(event:MouseEvent) {
      event.preventDefault()
      const response=await AuthService.loginEmail(email,password)
      if(response?.status!==undefined && response?.status <350 && response?.status >199){
        dispatch(authActions.becomeAuthed())
        dispatch(balanceActions.setBalance(response.data.user.balance))
				toastr.success('Регистрация','Вы успешно вошли')
        router.push(`${APP_URL}`)
      }
    }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content={`Войти на ${APP_NAME}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <form className={styles.registrationForm}>
            <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Введите ваш e-mail'></input>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Введите ваш пароль'></input>
            <button onClick={(e)=>loginEmail(e)}>Войти</button>
        </form>
    </>
  )
}
