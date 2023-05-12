import React from 'react'
import s from './SetNewPassword.module.css'
import { updatePasswordTC } from 'store/authReducer'
import { Navigate, useParams } from 'react-router-dom'
import { PATH } from 'routes/RoutesComponent'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { Error } from 'common/components/Error/Error'
import { selectAuthError, selectIsNewPasswordWasSet } from 'store/selectors/selectAuth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PasswordInput } from 'common/components/PasswordInput/PasswordInput'
import { getValidErrorMessage } from 'common/utils/get-valid-form-error'

type FormData = {
  password: string
}

export const SetNewPassword = () => {
  const dispatch = useAppDispatch()
  const resetPasswordToken = useParams().setNewPasswordToken

  const isNewPasswordWasSet = useAppSelector(selectIsNewPasswordWasSet)
  const authError = useAppSelector(selectAuthError)

  const {
    handleSubmit,
    control,
    formState: {
      errors: { password },
    },
  } = useForm<FormData>({
    mode: 'onBlur',
  })

  if (isNewPasswordWasSet) {
    return <Navigate to={PATH.LOGIN} />
  }

  const onSubmit: SubmitHandler<FormData> = data => {
    if (resetPasswordToken) {
      dispatch(updatePasswordTC(data.password, resetPasswordToken))
    }
  }

  return (
    <div className={s.updatePassword}>
      <div className={s.updatePassword_container}>
        <h2 className={s.forgotTitle}>Create new password</h2>
        <div style={{ height: '80px' }}></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: 7,
            }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                labelTitle="Password"
                variant="standard"
                helperText={getValidErrorMessage(password?.type)}
              />
            )}
          />

          <p>Create new password and we will send you further instructions to email</p>

          <input className={s.login_button} type="submit" value={'Create new password'} />
        </form>
      </div>
      {authError && <Error message={authError} />}
    </div>
  )
}
