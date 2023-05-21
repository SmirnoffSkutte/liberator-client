import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/auth.module.css'
import { MouseEvent, useEffect, useState } from 'react'
import { API_URL, APP_NAME, APP_URL } from '@/config'
import { useRouter } from 'next/router'
import {useForm} from 'react-hook-form'
import { AuthService } from '@/services/auth.service'
import { useAppDispatch } from '@/redux/reduxHooks'
import { authActions } from '@/redux/store'
import { toastr } from 'react-redux-toastr'

const inter = Inter({ subsets: ['latin'] })

interface emailAuth{
  email:string,
  password:string
}

export default function Registration() {

  const router=useRouter()
  const dispatch=useAppDispatch()
  const [email,setEmail]=useState<string>('');
  const [password,setPassword]=useState<string>('');

    async function registrationEmail(formData:emailAuth) {
      const response=await AuthService.registerEmail(formData.email,formData.password)
      if(response?.status!==undefined && response?.status <350 && response?.status >199){
        dispatch(authActions.becomeAuthed())
				toastr.success('Регистрация','Вы успешно зарегистрировались')
        router.push(`${APP_URL}`)
      }
    }
    const {
      register,
      formState: {
        errors
      },
      handleSubmit
    }=useForm<emailAuth>({
      mode:'onBlur'
    })
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content={`Регистрация на ${APP_NAME}`}/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <form onSubmit={handleSubmit(registrationEmail)} className={styles.authForm}>
            <input className={styles.authInput} placeholder='Введите ваш e-mail' {...register("email",{
              required:{
                value:true,
                message:'Email обязателен'
              },
              pattern:{
                value:/^\S+@\S+\.\S+$/,
                message:'Неверный email'
              }
            })}></input>
            {errors?.email && <span>{errors?.email?.message?.toString()}</span>}
            <input className={styles.authInput} type='password' placeholder='Введите ваш пароль' {...register('password',{
              required:{
                value:true,
                message:'Пароль обязателен'
              },
              minLength:{
                value:5,
                message:'Пароль минимум 5 символов'
              }
            })}></input>
            {errors?.password && <span>{errors?.password?.message?.toString()}</span>}
            <button className={styles.authButton}>Регистрация</button>
        </form>
    </>
  )
}
