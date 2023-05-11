import React, {useEffect} from "react";
import s from "./Login.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "routes/RoutesComponent";
import {Error} from "common/components/Error/Error";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import {getValidErrorMessage} from "common/utils/get-valid-form-error";
import TextField from "@mui/material/TextField";
import {PasswordInput} from "common/components/PasswordInput/PasswordInput";
import {loginTC} from "store/authReducer";
import {Checkbox, FormControlLabel} from "@mui/material";
import {selectAuthError, selectIsAuth} from "store/selectors/selectAuth";
import {Box} from "common/components/Box/Box";

export const emailRegex = /^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i;

type FormData = {
    email: string
    password: string
    isRememberMe: boolean
};

export const Login = () => {

    const dispatch = useAppDispatch()

    const authError = useAppSelector(selectAuthError)

    const {
        handleSubmit,
        control,
        register,
        formState: {
            errors: {email, password},
        },
    } = useForm<FormData>({
            mode: "onBlur",
            defaultValues: {
                isRememberMe: false
            }
        }
    );

    const onSubmit: SubmitHandler<FormData> = data => dispatch(loginTC(data.email, data.password, data.isRememberMe));

    return <div className={s.login}>
        <h2>Sign In</h2>

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
                name="isRememberMe"
                control={control}
                render={({field}) =>
                    <FormControlLabel control={<Checkbox {...field} />} label="Remember me"/>
                    // <Checkbox {...field} defaultChecked/>
                }
            />


            <Box display={"block"}>
                <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password?</NavLink>
            </Box>

            <input className={s.login_button} type="submit"/>

        </form>
        <p className={s.login_haveAccount}>Don't have an account?</p>
        <p className={s.login_loginReference}>
            <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
        </p>
        {authError && <Error message={authError}/>}
    </div>
}