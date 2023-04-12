import React, {FormEvent, MouseEventHandler, useEffect, useState} from "react";
import {FormInput} from "../../common/components/FormInput/FormInput";
import s from "./Registration.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {registrationTC} from "../../store/authReducer";
import {Error} from "../../common/components/Error/Error";


export const Registration = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const isRegistered = useAppSelector(state => state.auth.isRegistered)
    const authError = useAppSelector(state => state.auth.authError)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [formError, setFormError] = useState<string>('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const registrationHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password && confirmPassword) {
            if (!formError) {
                dispatch(registrationTC(email, password))
            }
        } else {
            setFormError("Пожалуйста, заполните все поля формы.")
        }
    }

    //VALIDATION
    const validate: React.FocusEventHandler<HTMLInputElement> = (e) => {

        let validateError: string = ''

        //EMAIL
        if (email) {
            if (!emailRegex.test(email)) {
                validateError = "Пожалуйста, введите корректный адрес электронной почты."
            }
        }

        //PASSWORD
        if (password) {
            if (password.length < 4) {
                validateError = "Пароль должен содержать не менее 4 символов."
            }
        }

        //CONFIRM PASSWORD
        if (confirmPassword) {
            if (confirmPassword.length > 3) {
                if (password !== confirmPassword) {
                    validateError = "Пожалуйста, убедитесь, что поле пароля и поле подтверждения пароля содержат одинаковые значения."
                }
            } else {
                validateError = "Пароль должен содержать не менее 4 символов."
            }
        }

        if (validateError !== formError) {
            setFormError(validateError)
        }
    }

    useEffect(() => {
        if (isRegistered) {
            navigate(PATH.LOGIN);
        }
    }, [isRegistered])

    return <div className={s.registration}>
        <h2>Sign Up</h2>
        <form onSubmit={registrationHandleSubmit}>
            <FormInput
                type={'email'}
                id={'email'}
                text={'Email'}
                value={email}
                onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }}
                onBlur={validate}
            />
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
            <FormInput
                type={'password'}
                id={'confirm-pass'}
                text={'Confirm password'}
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.currentTarget.value)
                }}
                onBlur={validate}
            />
            {formError && <div className={s.registration_error}>{formError}</div>}
            < button className={s.registration_button} type={'submit'}>
                Sign Up
            </button>
        </form>
        <p className={s.registration_haveAccount}>Already have an account?</p>
        <p className={s.registration_loginReference}>
            <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}