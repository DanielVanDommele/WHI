import { useContext } from "react";

import LoginStateContext from "../app/context";

export default function LogoBar () {
    const { loginState, setLoginState } = useContext(LoginStateContext);

    return (
        <div className="logoBar">
            <div className="logoText">WHI? (React/NextJS version)</div>
        </div>
    );
}