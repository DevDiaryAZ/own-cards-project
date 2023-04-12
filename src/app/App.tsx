import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../common/components/Header/Header";
import {RoutesComponent} from "../routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {authMeTC} from "../store/authReducer";
import {Loader} from "../common/components/Loader/Loader";

function App() {

    const dispatch = useAppDispatch()

    const isLoader = useAppSelector(state => state.app.isLoader)

    useEffect(() => {
        dispatch(authMeTC())
    }, [dispatch])

    return (
        isLoader ? <Loader/> : (
            <>
                <Header/>
                <RoutesComponent/>
            </>
        )
    );
}

export default App;
