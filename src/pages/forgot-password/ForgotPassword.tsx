import React, {FormEvent, useEffect, useState} from "react";
import s from "./ForgotPassword.module.css";
import {FormInput} from "../../common/components/FormInput/FormInput";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {Error} from "../../common/components/Error/Error";
import {emailRegex} from "../login/Login";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {forgotTC, loginTC} from "../../store/authReducer";
import {SentEmail} from "./components/SentEmail/SentEmail";

export const ForgotPassword = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('')
    const [formError, setFormError] = useState<string>('')

    const authError = useAppSelector(state => state.auth.authError)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isLetterWasSent = useAppSelector(state => state.auth.isLetterWasSent)

    const forgotHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email) {
            if (!formError) {
                dispatch(forgotTC(email))
            }
        } else {
            setFormError("Пожалуйста, заполните Email.")
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

        if (validateError !== formError) {
            setFormError(validateError)
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate(PATH.PROFILE);
        }
    }, [isAuth])

    return isLetterWasSent ? <SentEmail/> : <div className={s.login}>
        <h2>Forgot your password?</h2>
        <form onSubmit={forgotHandleSubmit}>
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
            {formError && <div className={s.login_error}>{formError}</div>}
            <p>Enter your email address and we will send you further instructions </p>

            <button className={s.login_button} type={'submit'}>
                Send Instructions
            </button>
        </form>
        <p className={s.login_haveAccount}>Did you remember your password?</p>
        <p className={s.login_loginReference}>
            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}