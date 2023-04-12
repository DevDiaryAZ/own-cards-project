import React from "react";
import {Route, Routes} from "react-router-dom";
import {Registration} from "../pages/registration/Registration";
import {Login} from "../pages/login/Login";
import {Profile} from "../pages/profile/Profile";
import {ForgotPassword} from "../pages/forgot-password/ForgotPassword";
import {SetNewPassword} from "../pages/set-new-password/SetNewPassword";


//PATH
export const PATH = {
    REGISTRATION: "/registration",
    LOGIN: "/login",
    PROFILE: "/profile",
    FORGOT_PASSWORD: "/forgot-password",
    SET_NEW_PASSWORD: "/set-new-password/:setNewPasswordToken?",
}

//routes
export const RoutesComponent = () => {
    return <Routes>
        <Route path={PATH.REGISTRATION} element={<Registration/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.PROFILE} element={<Profile/>}/>
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
        <Route path={PATH.SET_NEW_PASSWORD} element={<SetNewPassword/>}/>
    </Routes>
}