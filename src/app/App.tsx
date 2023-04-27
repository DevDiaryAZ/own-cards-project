import React, {useEffect} from 'react';
import './App.css';
import {Header} from "common/components/Header/Header";
import {PATH, RoutesComponent} from "routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {authMeTC} from "store/authReducer";
import {Loader} from "common/components/Loader/Loader";
import {useNavigate} from "react-router-dom";
import {selectIsAuth} from 'store/selectors/selectAuth';

function App() {

    const dispatch = useAppDispatch()

    const isLoader = useAppSelector(state => state.app.isLoader)
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authMeTC())
        if (!isAuth) {
            navigate(PATH.LOGIN);
        }
    }, [isAuth])

    return (
        <>
            {isLoader && <Loader/>}
            <Header/>
            <RoutesComponent/>
        </>
    );
}

export default App;
