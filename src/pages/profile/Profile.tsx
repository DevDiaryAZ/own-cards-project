import React, {ChangeEvent, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import avatarUndefined from 'common/assets/pictures/avatar_undefined.png'
import editPhotoIcon from 'common/assets/pictures/edit_photo_icon.svg'
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {PATH} from "routes/RoutesComponent";
import s from 'pages/profile/Profile.module.css'
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Error} from "common/components/Error/Error";
import {logoutTC} from "store/authReducer";
import {changeNameTC} from "store/userReducer";
import {selectUserAvatar, selectUserEmail, selectUserName} from "store/selectors/selectUser";
import {TextField} from "@mui/material";
import {Button} from "common/components/Button/Button";

export const Profile = () => {

    const [isEditAvatar, setIsEditAvatar] = useState<boolean>(false)
    const [newAvatar, setNewAvatar] = useState<string>('')

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const authError = useAppSelector(state => state.auth.authError)

    const email = useAppSelector(selectUserEmail)
    const name = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)

    const onChangeHandler = (newValue: string) => {
        if (newValue && newValue !== name) {
            dispatch(changeNameTC(newValue))
        }
    }
    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    const handlerCancelEditAvatar = () => {
        setIsEditAvatar(false)
        setNewAvatar('')
    }

    const handlerSaveNewAvatar = () => {
        console.log(newAvatar)
        setIsEditAvatar(false)
        setNewAvatar('')
    }

    useEffect(() => {
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
                <div className={s.avatarWrapper}>
                    <img src={userAvatar ? userAvatar : avatarUndefined} alt="avatar"/>
                    {!isEditAvatar &&
                    <button className={s.avatarEditButton}
                    onClick={()=>setIsEditAvatar(true)}>
                        <img src={editPhotoIcon} alt="edit photo icon"/>
                    </button>}
                </div>

                {isEditAvatar && <div className={s.editAvatarContainer}>
                    <TextField  id="outlined-basic" onChange={()=>setNewAvatar(newAvatar)} value={newAvatar}/>
                    <div className={s.buttonContainer}>
                        <Button label={'Save'} onClick={handlerSaveNewAvatar}/>
                        <Button label={'Cancel'} onClick={handlerCancelEditAvatar}/>
                    </div>
                </div>}

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