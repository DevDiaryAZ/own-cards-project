import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Registration } from 'pages/auth/registration/Registration'
import { Login } from 'pages/auth/login/Login'
import { Profile } from 'pages/profile/Profile'
import { ForgotPassword } from 'pages/auth/forgot-password/ForgotPassword'
import { SetNewPassword } from 'pages/auth/set-new-password/SetNewPassword'
import { Page404 } from 'pages/page404/Page404'
import { Packs } from 'pages/packs/Packs'
import { Cards } from 'pages/packs/cards/Cards'
import { selectIsAuth } from 'store/selectors/selectAuth'
import { useAppSelector } from 'hooks/hooks'

//PATH
export const PATH = {
  REGISTRATION: '/registration',
  LOGIN: '/login',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  SET_NEW_PASSWORD: '/set-new-password/:setNewPasswordToken?',
  PACKS: '/packs',
  CARDS: '/cards/:isMyPack?/:packId?/:packName?',
}

//routes
export const RoutesComponent = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <Routes>
      {/* 404 */}
      <Route path={'/*'} element={<Page404 />} />

      {/* first open */}
      <Route path={'/'} element={isAuth ? <Packs /> : <Navigate to={PATH.LOGIN} />} />

      {/* auth routes */}
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.LOGIN} element={isAuth ? <Navigate to={PATH.PACKS} /> : <Login />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword />} />

      {/* profile */}
      <Route path={PATH.PROFILE} element={isAuth ? <Profile /> : <Navigate to={PATH.LOGIN} />} />

      {/* packs */}
      <Route path={PATH.PACKS} element={isAuth ? <Packs /> : <Navigate to={PATH.LOGIN} />} />

      {/* cards */}
      <Route path={PATH.CARDS} element={isAuth ? <Cards /> : <Navigate to={PATH.LOGIN} />} />
    </Routes>
  )
}
