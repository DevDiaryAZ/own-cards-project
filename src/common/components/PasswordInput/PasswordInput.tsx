import React, { forwardRef, ReactElement, useState } from 'react'
import s from './PasswordInput.module.css'
import passwordEye from '../../assets/pictures/eye.svg'
import passwordEyeHide from '../../assets/pictures/eye-off.svg'
import TextField, { StandardTextFieldProps } from '@mui/material/TextField'

type PropsType = StandardTextFieldProps & {
  labelTitle: string
  helperText?: string
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PasswordInput = forwardRef(({ ...props }: PropsType, ref) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const imgOnClickHandler = () => {
    setIsHidden(!isHidden)
  }

  return (
    <div className={s.registration_input}>
      <TextField
        ref={props.ref}
        label={props.labelTitle}
        variant={props.variant}
        error={!!props.helperText}
        helperText={props.helperText}
        onBlur={props.onBlur}
        onChange={props.onChange}
        type={isHidden ? 'password' : 'text'}
        sx={{
          width: '100%',
        }}
        inputProps={{
          autoComplete: 'new-password',
        }}
      />

      {/* eye logic*/}
      {isHidden ? (
        <img
          className={s.registration_eye}
          src={passwordEye}
          onClick={imgOnClickHandler}
          alt={'passwordEye'}
        />
      ) : (
        <img
          className={s.registration_eye}
          src={passwordEyeHide}
          onClick={imgOnClickHandler}
          alt={'passwordEyeHide'}
        />
      )}
    </div>
  )
})
