import React, { useCallback, useEffect, useState } from 'react'
import closeIcon from '../../assets/pictures/error-popup-close-btn.png'
import styles from './Error.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { setAuthErrorAC } from '../../../store/authReducer'

type ErrorPropsType = {
  message: string
}

export const Error = ({ message }: ErrorPropsType) => {
  const errorMessage = useAppSelector<string>(state => state.auth.authError)
  const [visible, setVisible] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  const closeError = useCallback(() => {
    setVisible(false)
    dispatch(setAuthErrorAC(''))
  }, [dispatch])

  useEffect(() => {
    setVisible(true)
    setTimeout(() => {
      closeError()
    }, 6000)
  }, [closeError, errorMessage])

  if (!visible) return null

  return (
    <div className={styles.errorBox}>
      <span className={styles.errorMessage}>{message}</span>
      <img src={closeIcon} alt="closeIcon" className={styles.closeIcon} onClick={closeError} />
    </div>
  )
}
