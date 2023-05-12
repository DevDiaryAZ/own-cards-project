import React, { useEffect } from 'react'

import './App.css'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { SAppWrapper } from 'app/styles'
import { Loader } from 'common/components/Loader/Loader'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { Header } from 'layout/Header/Header'
import { PATH, RoutesComponent } from 'routes/RoutesComponent'
import { authMeTC } from 'store/authReducer'
import { selectIsLoader } from 'store/selectors/selectApp'
import { selectIsAuth } from 'store/selectors/selectAuth'
import { baseTheme } from 'styles/themes/baseTheme'

function App() {
  const dispatch = useAppDispatch()

  const isLoader = useAppSelector(selectIsLoader)
  const isAuth = useAppSelector(selectIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authMeTC())
    if (!isAuth) {
      navigate(PATH.LOGIN)
    }
  }, [isAuth])

  const themes = {
    light: baseTheme,
  }

  const currentTheme = 'light'

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      {isLoader && <Loader />}
      <SAppWrapper>
        <Header />
        <RoutesComponent />
      </SAppWrapper>
    </ThemeProvider>
  )
}

export default App
