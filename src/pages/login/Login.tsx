import React, {FormEvent, useEffect, useState} from "react";
import s from "./Login.module.css";
import {FormInput} from "../../common/components/FormInput/FormInput";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {Error} from "../../common/components/Error/Error";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {loginTC, registrationTC} from "../../store/authReducer";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {TextInput} from "../../common/components/TextInput/TextInput";
import {getValidErrorMessage} from "../../common/utils/get-valid-form-error";
import TextField from "@mui/material/TextField";
import {PasswordInput} from "../../common/components/PasswordInput/PasswordInput";

// export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

type FormData = {
    email: string;
    password: string;
};

export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const authError = useAppSelector(state => state.auth.authError)

    useEffect(() => {
        if (isAuth) {
            navigate(PATH.PROFILE);
        }
    }, [isAuth])

    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors: {email, password},
        },
    } = useForm<FormData>({
            mode: "onBlur",
        }
    );

    // const {handleSubmit, control, formState: {errors}} = useForm<IFormInputs>({
    //     mode: "onBlur",
    //     defaultValues: {
    //         checkbox: false
    //     }
    // });
    const onSubmit: SubmitHandler<FormData> = data => console.log(data);

    return <div className={s.login}>
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={s.registration_input}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                        pattern: emailRegex,
                    }}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="Email"
                            variant="standard"

                            error={!!email}
                            helperText={getValidErrorMessage(email?.type)}
                        />}
                />
            </div>

            <div className={s.registration_input}>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: true,
                        minLength: 7,
                    }}
                    render={({field}) =>
                        <PasswordInput
                            {...field}
                            labelTitle="Password"
                            variant="standard"
                            helperText={getValidErrorMessage(password?.type)}
                        />}
                />
            </div>

            <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password?</NavLink>

            <input className={s.login_button} type="submit"/>

        </form>
        <p className={s.login_haveAccount}>Don't have an account?</p>
        <p className={s.login_loginReference}>
            <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}