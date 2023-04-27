import React, {useEffect} from "react";
import s from "./Registration.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {registrationTC} from "store/authReducer";
import {Error} from "common/components/Error/Error";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {getValidErrorMessage} from "common/utils/get-valid-form-error";
import {emailRegex} from "../login/Login";
import {PasswordInput} from "common/components/PasswordInput/PasswordInput";
import {selectAuthError, selectIsRegistered} from "store/selectors/selectAuth";

type FormData = {
    email: string
    password: string
    confirmPassword: string
};

export const Registration = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isRegistered = useAppSelector(selectIsRegistered)
    const authError = useAppSelector(selectAuthError)

    const {
        handleSubmit,
        control,
        register,
        getValues,
        formState: {
            errors: {email, password, confirmPassword},
        },
    } = useForm<FormData>({
            mode: "onBlur",
        }
    );

    const onSubmit: SubmitHandler<FormData> = data => dispatch(registrationTC(data.email, data.password));

    // useEffect(() => {
    //     console.log('registrat useeffect')
    //     if (isRegistered) {
    //         navigate(PATH.LOGIN);
    //     }
    // }, [isRegistered])

    return <div className={s.registration}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.registration_input}>
                <TextField
                    {...register('email', {required: true, pattern: emailRegex})}
                    label="Email"
                    variant="standard"
                    error={!!email}
                    helperText={getValidErrorMessage(email?.type)}
                    sx={{
                        width: '100%'
                    }}
                />
            </div>

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

            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: true,
                    minLength: 7,
                    validate: value => value === getValues('password'),
                }}
                render={({field}) =>
                    <PasswordInput
                        {...field}
                        labelTitle="Confirm password"
                        variant="standard"
                        helperText={getValidErrorMessage(confirmPassword?.type)}
                    />}
            />

            <input className={s.login_button} type="submit" value={"Sign Up"}/>
        </form>
        <p className={s.registration_haveAccount}>Already have an account?</p>
        <p className={s.registration_loginReference}>
            <NavLink to={PATH.LOGIN}>Sign In</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}