import { useContext } from "react";

import LoginStateContext from "../app/context";

import LoginButton from "./button/loginButton";
import LogoutButton from "./button/logoutButton";
import SignupButton from "./button/signupButton";

export default function LogoBar () {
    //const { loginState, setLoginState } = useContext(LoginStateContext);

    return (
        <div className="logoBar">
            <div className="logoText">WHI? (React version)</div>
            <div className="loginInfo">temp</div>
            <div className="buttonSpace">
                <LoginButton />
                <SignupButton />
            </div>
        </div>
    );
}