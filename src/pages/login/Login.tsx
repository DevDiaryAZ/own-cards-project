import React, {FormEvent, useEffect, useState} from "react";
import s from "./Login.module.css";
import {FormInput} from "../../common/components/FormInput/FormInput";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {Error} from "../../common/components/Error/Error";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {loginTC, registrationTC} from "../../store/authReducer";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const authError = useAppSelector(state => state.auth.authError)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [formError, setFormError] = useState<string>('')

    const loginHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password) {
            if (!formError) {
                dispatch(loginTC(email, password, rememberMe))
            }
        } else {
            setFormError("Пожалуйста, заполните все поля формы.")
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate(PATH.PROFILE);
        }
    }, [isAuth])

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

        if (validateError !== formError) {
            setFormError(validateError)
        }
    }

    return <div className={s.login}>
        <h2>Sign In</h2>
        <form onSubmit={loginHandleSubmit}>
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
            {formError && <div className={s.login_error}>{formError}</div>}
            <FormGroup>
                <FormControlLabel control={<Checkbox/>} label="Remember me"/>
            </FormGroup>

            <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password?</NavLink>
            <button className={s.login_button} type={'submit'}>
                Sign In
            </button>
        </form>
        <p className={s.login_haveAccount}>Don't have an account?</p>
        <p className={s.login_loginReference}>
            <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}