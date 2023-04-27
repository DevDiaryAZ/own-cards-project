import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import avatar from 'common/assets/pictures/avatar.jpg'
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {PATH} from "routes/RoutesComponent";
import s from 'pages/profile/Profile.module.css'
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Error} from "common/components/Error/Error";
import {logoutTC} from "store/authReducer";
import {changeNameTC} from "store/userReducer";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const authError = useAppSelector(state => state.auth.authError)

    const email = useAppSelector(state => state.user.email)
    const name = useAppSelector(state => state.user.name)

    const onChangeHandler = (newValue: string) => {
        if (newValue && newValue !== name) {
            dispatch(changeNameTC(newValue))
        }
    }
    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        console.log('profile useeffect')
        if (!isAuth) {
            navigate(PATH.LOGIN);
        }
    }, [isAuth])

    return <div className={s.profile_container}>
        <div className={s.backbutton_wrapper}>
            <button className={s.profile_backbutton} onClick={() => {
                navigate(PATH.PACKS)
            }}>
                Back to Packs List
            </button>
        </div>
        <div className={s.profile_wrapper}>
            <h2>Personal Information</h2>
            <div>
                <div>
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className={s.profileName}>
                    <EditableSpan value={name} onChange={onChangeHandler}/>
                </div>
                <div className={s.profileEmail}>{email}</div>
                <button className={s.profileButton} onClick={onClickHandler}>
                    Log out
                </button>
            </div>
            {authError && <Error message={authError}/>}
        </div>
    </div>

}