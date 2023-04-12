import React from 'react'

import s from './SentEmail.module.css'

import checkEmailImg from "../../../../common/assets/pictures/check-email.svg"
import {PATH} from "../../../../routes/RoutesComponent";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/hooks";

export const SentEmail = () => {

    const email = useAppSelector(state => state.user.email)
    const navigate = useNavigate()

    const buttonOnClickHandler = () => {
        return navigate(PATH.LOGIN)
    }

    return (
        <div className={s.sentEmail}>
            <div className={s.sentEmail_container}>
                <h2 className={s.forgotTitle}>Check Email</h2>
                <img src={checkEmailImg} alt={'check Email picture'}/>
                <p>We’ve sent an Email with instructions to </p>
                <p>{email}</p>
                <button className={s.forgotButton} onClick={buttonOnClickHandler}>
                    Back to login
                </button>
            </div>
        </div>
    )
}