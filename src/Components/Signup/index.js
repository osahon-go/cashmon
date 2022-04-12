import React from "react";
import { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import validator from "validator";

//import styles
import {
  EmailStatus,
  FormHold,
  InputTag,
  SubmitForm,
  EmailValid,
  PasswordValid,
} from "./SignupElements";

function Signup({ showing, data }) {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  const emailInput = useRef();

  //Validate email using validator
  const validateEmail = (e) => {
    const emailEntry = e.target.value;
    if (validator.isEmail(emailEntry)) {
      setEmail(emailEntry);
      setEmailStatus("valid");
    } else {
      setEmailStatus("invalid");
    }
  };

  //Confirm passwords
  const validatePassword = (e) => {
    const passwordEntry = e.target.value;
    setConfirm(e.target.value);
    if (passwordEntry == password) {
      setPasswordStatus("valid");
    } else {
      setPasswordStatus("invalid");
    }
  };

  //Signup function
  const signUp = (e) => {
    e.preventDefault();
    if (confirm != password || emailStatus != "valid")
      return alert("Check your Email or Password");
    const id = Math.floor(Math.random() * 10000000000000);
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const values = {
      id,
      firstname,
      email,
      password: hashPass,
      sh: salt,
    };
    axios
      .post("https://cashmonitor.herokuapp.com/createUser", values)
      .then((response) => {
        const stat = response.data;
        switch (stat.status) {
          case "Success":
            alert("Registered Successfully");
            emailInput.current.value = "";
            setFirstname("");
            setEmail("");
            setPassword("");
            setConfirm("");
            setEmailStatus("");
            setPasswordStatus("");
            data(); //This function passed as a props.
            break;
          case "Conflict":
            alert("User already exists");
            break;
          default:
            alert("Failed. Check your entries");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <FormHold showing={showing}>
        <InputTag
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        ></InputTag>
        <InputTag
          ref={emailInput}
          placeholder="Email"
          //value={email.email || ""}
          onChange={(e) => validateEmail(e)}
        ></InputTag>
        <EmailValid status={emailStatus}></EmailValid>
        <InputTag
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></InputTag>
        <InputTag
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => validatePassword(e)}
        ></InputTag>
        <PasswordValid status={passwordStatus}></PasswordValid>
        <SubmitForm type="submit" value="Go" onClick={signUp}></SubmitForm>
      </FormHold>
    </>
  );
}

export default Signup;
