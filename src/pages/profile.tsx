import { useAppSelector } from '@/redux/reduxHooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {}

function ProfilePage({}: Props) {
    const router=useRouter()
    const isAuthedUser=useAppSelector(state=>state.auth.authed)
    useEffect(()=>{
        isAuthedUser ?
        null
        : router.push('/login')
    },[])
  return (
    <div>
    {isAuthedUser ? (
        <div>profilepage</div>
    ) : (
        <div>Нет авторизации</div>
    )}
    </div>
  )
}

export default ProfilePage