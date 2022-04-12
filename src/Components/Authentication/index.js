import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Components
import Signup from "../Signup";
import Login from "../Login";
import Dashboard from "../Dashboard";

//Styles
import {
  BodyWrap,
  AuthSection,
  AuthTitle,
  AuthType,
  AuthSwitch,
} from "./AuthenticationElements";

function Authentication() {
  const [login, setLogin] = useState(true);
  const [sign, setSign] = useState(false);
  const [switchText, setSwitchText] = useState("Join");
  let navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("cashmon-user");
    if (activeUser) return navigate("/select", { replace: true });
  }, []);

  const switchType = () => {
    const oldLog = login;
    const oldSign = sign;
    setLogin(!oldLog);
    setSign(!oldSign);

    if (sign) {
      setSwitchText("Join");
    } else {
      setSwitchText("Start");
    }
  };

  return (
    <>
      <BodyWrap>
        <AuthSection>
          <AuthTitle>Cashmon</AuthTitle>
          <AuthType>
            <Login showing={login} />
            <Signup showing={sign} data={switchType} />
          </AuthType>
        </AuthSection>
        <AuthSwitch onClick={switchType}>{switchText}</AuthSwitch>
      </BodyWrap>
    </>
  );
}

export default Authentication;
