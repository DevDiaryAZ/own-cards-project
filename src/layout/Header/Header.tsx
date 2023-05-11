import s from "layout/Header/Header.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "routes/RoutesComponent";
import {useAppSelector} from "hooks/hooks";
import {selectIsAuth} from "store/selectors/selectAuth";
import avatarUndefined from 'common/assets/pictures/default-photo.png'
import {selectUserAvatar, selectUserName} from "store/selectors/selectUser";
import {SHeader, SHeaderLogo} from "layout/Header/styles";
import {Avatar} from "common/components/Avatar/Avatar";
import {Box} from "common/components/Box/Box";
import {SText} from "common/components/Text/SText";

export const Header = () => {

    const navigate = useNavigate()

    const isAuth = useAppSelector(selectIsAuth)
    const name = useAppSelector(selectUserName)
    const userAvatar = useAppSelector(selectUserAvatar)

    const windowWidth = window.innerWidth;

    return <SHeader>

        <SHeaderLogo><NavLink to={PATH.PACKS}>LEARN SIMPLE</NavLink></SHeaderLogo>

        {!isAuth && <NavLink to={PATH.REGISTRATION} style={{whiteSpace: "nowrap"}}>Sign Up</NavLink>}

        {/*{!isAuth && <NavLink to={PATH.LOGIN}>Sing In</NavLink>}*/}

        {isAuth && <Box
            alignItems={"center"}
            gap={10}
            onClick={() => navigate(PATH.PROFILE)}
            cursor={"pointer"}
        >
            {windowWidth > 400 && (
                <SText maxWidth={"150px"} fontWeight={"600"} fontSize={"16px"} isEllipsis>
                    {name}
                </SText>
            )}
            <Avatar size={"small"} img={userAvatar ? userAvatar : avatarUndefined} />
        </Box>}
    </SHeader>
}