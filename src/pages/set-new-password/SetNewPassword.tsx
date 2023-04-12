import React, {FormEvent, useState} from 'react'
import s from './SetNewPassword.module.css'
import {FormInput} from "../../common/components/FormInput/FormInput";
import {emailRegex} from "../login/Login";
import {loginTC, updatePasswordTC} from "../../store/authReducer";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Error} from "../../common/components/Error/Error";

export const SetNewPassword = () => {

    const dispatch = useAppDispatch()
    const resetPasswordToken = useParams().setNewPasswordToken

    const [password, setPassword] = useState<string>('')
    const [formError, setFormError] = useState<string>('')

    const authError = useAppSelector(state => state.auth.authError)
    const isNewPasswordWasSet = useAppSelector(state => state.auth.isNewPasswordWasSet)

    //VALIDATION
    const validate: React.FocusEventHandler<HTMLInputElement> = (e) => {

        let validateError: string = ''

        //PASSWORD
        if (password) {
            if (password.length < 7) {
                validateError = "Пароль должен содержать не менее 7 символов."
            }
        }

        if (validateError !== formError) {
            setFormError(validateError)
        }
    }

    const updatePasswordHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password && resetPasswordToken) {
            if (!formError) {
                dispatch(updatePasswordTC(password, resetPasswordToken))
            }
        } else {
            setFormError("Пожалуйста, заполните все поля формы.")
        }
    }


    if (isNewPasswordWasSet) {
        return <Navigate to={PATH.LOGIN} />
    }

    return (
        <div className={s.updatePassword}>
            <div className={s.updatePassword_container}>
                <h2 className={s.forgotTitle}>Create new password</h2>
                <div style={{height: '80px'}}></div>
                <form onSubmit={updatePasswordHandleSubmit}>
                    <FormInput
                        type={'password'}
                        id={'pass'}
                        text={'Password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.currentTarget.value)
                        }}
                        onBlur={validate}
                    />
                    {formError && <div className={s.login_error}>{formError}</div>}
                    <p>Create new password and we will send you further instructions to email</p>

                    <button className={s.login_button} type={'submit'}>
                        Create new password
                    </button>
                </form>
            </div>
            {authError && <Error message={authError}/>}
        </div>
    )
}