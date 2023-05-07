import React, {useEffect} from 'react';
import './App.css';
import {Header} from "layout/Header/Header";
import {PATH, RoutesComponent} from "routes/RoutesComponent";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {authMeTC} from "store/authReducer";
import {Loader} from "common/components/Loader/Loader";
import {useNavigate} from "react-router-dom";
import {selectIsAuth} from 'store/selectors/selectAuth';
import {selectIsLoader} from "store/selectors/selectApp";
import {baseTheme} from "styles/themes/baseTheme";
import {ThemeProvider} from "styled-components";
import {SAppWrapper} from "app/styles";

function App() {

    const dispatch = useAppDispatch()

    const isLoader = useAppSelector(selectIsLoader)
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authMeTC())
        if (!isAuth) {
            navigate(PATH.LOGIN);
        }
    }, [isAuth])

    const themes = {
        light: baseTheme,
    };

    const currentTheme = "light"

    return (
        <ThemeProvider theme={themes[currentTheme]}>
            {isLoader && <Loader/>}
            <SAppWrapper>
                <Header/>
                <RoutesComponent/>
            </SAppWrapper>

        </ThemeProvider>
    );
}

export default App;
