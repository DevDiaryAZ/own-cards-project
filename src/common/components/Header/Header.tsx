import React from "react";
import styles from "./Header.module.css"
import {Button} from "../Button/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../routes/RoutesComponent";

export const Header = () => {
    return <div className={styles.header}>
        <span>IT-Incubator</span>
        <NavLink
            to={PATH.REGISTRATION}>
            Registration
        </NavLink>
        <NavLink
            to={PATH.PROFILE}>
            Profile
        </NavLink>
        {/*<Button*/}
        {/*    name={'Sign In'}*/}
        {/*    callBack={() => {*/}
        {/*    }}*/}
        {/*/>*/}
        <NavLink to={PATH.LOGIN}>Sing In
        </NavLink>
    </div>
}