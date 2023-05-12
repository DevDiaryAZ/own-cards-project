import React, { useEffect } from 'react'
import s from './ForgotPassword.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { PATH } from 'routes/RoutesComponent'
import { Error } from 'common/components/Error/Error'
import { emailRegex } from 'pages/auth/login/Login'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { forgotTC } from 'store/authReducer'
import { SentEmail } from './components/SentEmail/SentEmail'
import { selectAuthError, selectIsAuth, selectIsLetterWasSent } from 'store/selectors/selectAuth'
import TextField from '@mui/material/TextField'
import { getValidErrorMessage } from 'common/utils/get-valid-form-error'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authError = useAppSelector(selectAuthError)
  const isAuth = useAppSelector(selectIsAuth)
  const isLetterWasSent = useAppSelector(selectIsLetterWasSent)

  useEffect(() => {
    if (isAuth) {
      navigate(PATH.PROFILE)
    }
  }, [isAuth])

  const {
    handleSubmit,
    register,
    formState: {
      errors: { email },
    },
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormData> = data => dispatch(forgotTC(data.email))

  return isLetterWasSent ? (
    <SentEmail />
  ) : (
    <div className={s.login}>
      <h2>Forgot your password?</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', { required: true, pattern: emailRegex })}
          label="Email"
          variant="standard"
          error={!!email}
          helperText={getValidErrorMessage(email?.type)}
          sx={{
            width: '100%',
          }}
        />

        <p>Enter your email address and we will send you further instructions </p>

        <button className={s.login_button} type={'submit'}>
          Send Instructions
        </button>
      </form>
      <p className={s.login_haveAccount}>Did you remember your password?</p>
      <p className={s.login_loginReference}>
        <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
      </p>
      {authError && <Error message={authError} />}
    </div>
  )
}
