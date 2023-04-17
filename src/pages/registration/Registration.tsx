import React, {FormEvent, MouseEventHandler, useEffect, useState} from "react";
import {FormInput} from "../../common/components/FormInput/FormInput";
import s from "./Registration.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {registrationTC} from "../../store/authReducer";
import {Error} from "../../common/components/Error/Error";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {getValidErrorMessage} from "../../common/utils/get-valid-form-error";
import {emailRegex} from "../login/Login";
import {PasswordInput} from "../../common/components/PasswordInput/PasswordInput";

type FormData = {
    email: string
    password: string
    confirmPassword: string
};

export const Registration = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const isRegistered = useAppSelector(state => state.auth.isRegistered)
    const authError = useAppSelector(state => state.auth.authError)

    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const [confirmPassword, setConfirmPassword] = useState<string>('')
    // const [formError, setFormError] = useState<string>('')

    // const registrationHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (email && password && confirmPassword) {
    //         if (!formError) {
    //             dispatch(registrationTC(email, password))
    //         }
    //     } else {
    //         setFormError("Пожалуйста, заполните все поля формы.")
    //     }
    // }

    const {
        handleSubmit,
        control,
        formState: {
            errors: {email, password, confirmPassword},
        },
    } = useForm<FormData>({
            mode: "onBlur",
        }
    );

    const onSubmit: SubmitHandler<FormData> = data => console.log(data);

    useEffect(() => {
        if (isRegistered) {
            navigate(PATH.LOGIN);
        }
    }, [isRegistered])

    return <div className={s.registration}>
        <h2>Sign Up</h2>
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
                            sx={{
                                width: '100%'
                            }}
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
            <div className={s.registration_input}>
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: true,
                        minLength: 7,
                    }}
                    render={({field}) =>
                        <PasswordInput
                            {...field}
                            labelTitle="Confirm password"
                            variant="standard"
                            helperText={getValidErrorMessage(confirmPassword?.type)}
                        />}
                />
            </div>

            <input className={s.login_button} type="submit" value={"Sign Up"}/>
        </form>
        <p className={s.registration_haveAccount}>Already have an account?</p>
        <p className={s.registration_loginReference}>
            <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}