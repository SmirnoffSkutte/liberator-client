import { FC, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import layoutStyles from '@/styles/layouts.module.css'
import { Inter } from 'next/font/google'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { APP_URL } from "@/config";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import useOnClickOutside from "@/helpers/useOnClickOutside";
import { AuthService } from "@/services/auth.service";

interface props {
  children:React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const AppLayout:FC<props>=(props:props)=>{
  const isAuthed = useAppSelector((state) => state.auth.authed)
  const loadingStatus= useAppSelector((state)=>state.auth.status)
  const balance=useAppSelector((state)=>state.balance.balance)
  const [isProfileDialogOpen,setIsProfileDialogOpen]=useState<boolean>(false)
  const profileDialogRef=useRef(null)
  useOnClickOutside(profileDialogRef, () => {
    setIsProfileDialogOpen(false)
  });

  const dispatch = useAppDispatch()
  let nickname;
  if(isAuthed){
    const userInfo=localStorage.getItem('user')
    if(userInfo){
      let parsed=JSON.parse(userInfo)
      nickname=parsed.nickname
    }
  }
  return (
    <>
    <div className={layoutStyles.appWrapper}>
      <nav style={inter.style} className={layoutStyles.navBlock}>
          <div>
            <Link href={`${APP_URL}`}>logo</Link>
          </div>
          {/* <img className={layoutStyles.logo}></img> */}
          {loadingStatus === "loading" ? (
            <Skeleton/>
          ):(
            isAuthed ? (
              <ul className={layoutStyles.navButtons}>
                <li className={layoutStyles.navButtonGray}>Баланс:{balance}</li>
                <li ref={profileDialogRef} onClick={(e)=>setIsProfileDialogOpen(!isProfileDialogOpen)} className={layoutStyles.navButtonProfile}>
                  {nickname}
                  <dialog open={isProfileDialogOpen} className={layoutStyles.profileDialog}>
                    <div className={layoutStyles.profileDialogInsideBlock}>
                      <div className={layoutStyles.dialogLink}><Link href={`${APP_URL}/profile`}>Пополнить</Link></div>
                      <div className={layoutStyles.dialogLink}><Link href={`${APP_URL}/profile`}>Вывести</Link></div>
                      <div className={layoutStyles.dialogLink}><Link href={`${APP_URL}/profile`}>Аккаунт</Link></div>
                      <div className={layoutStyles.dialogLink} onClick={()=>AuthService.logout()}>Выйти</div>
                    </div>
                  </dialog>
                </li>
              </ul>
            ):(
              <ul className={layoutStyles.navButtons}>
                <li className={layoutStyles.navButtonGray}>
                  <Link href={`${APP_URL}/login`}>Войти</Link>
                </li>
                <li className={layoutStyles.navButtonLigth}>
                  <Link href={`${APP_URL}/registration`}>Регистрация</Link>
                </li>
              </ul>
            )
          )}
          {/* {} */}
        </nav>
      <main className={layoutStyles.mainBlock}>{props.children}</main>
      <footer className={layoutStyles.footerBlock}>footer</footer>
      </div>
    </>
  )
}

export default AppLayout