import React, { useState, useRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import validator from "validator";
import { useNavigate } from "react-router-dom";

//Component

//import styles
import { FormHold, InputTag, SubmitForm, EmailValid } from "./LoginElements";

function Login({ showing }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const emailInput = useRef();
  const btn = useRef();
  let navigate = useNavigate();

  //Validate Email
  const validateEmail = (e) => {
    const emailEntry = e.target.value;
    if (validator.isEmail(emailEntry)) {
      setEmail(emailEntry);
      setEmailStatus("valid");
    } else {
      setEmailStatus("invalid");
    }
  };

  //Login function
  const log = (e) => {
    e.preventDefault();
    if (emailStatus != "valid" || password == "")
      return alert("Check your Email or Password");
    const values = {
      email,
      password,
    };

    axios
      .get("https://cashmonitor.herokuapp.com/findEmail", {
        params: { email: email },
      })
      .then((response) => {
        const sh = response;
        if (typeof sh.data != "string")
          return alert("User not found. Please join");
        const hashPass = bcrypt.hashSync(password, response.data);
        axios
          .get("https://cashmonitor.herokuapp.com/logIn", {
            params: { email, hashPass },
          })
          .then((response) => {
            const res = response.data;
            if (!res.firstname) return alert("Incorrect Password");
            emailInput.current.value = "";
            setPassword("");
            setEmailStatus("");
            const userID = res.id;
            const userFirstname = res.firstname;
            localStorage.setItem("cashmon-user", userID);
            navigate("/select", { replace: true });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <FormHold showing={showing}>
        <InputTag
          ref={emailInput}
          placeholder="Email"
          //value={email}
          onChange={(e) => validateEmail(e)}
        ></InputTag>
        <EmailValid status={emailStatus}></EmailValid>
        <InputTag
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></InputTag>
        <SubmitForm type="submit" value="Go" onClick={log}></SubmitForm>
      </FormHold>
    </>
  );
}

export default Login;
