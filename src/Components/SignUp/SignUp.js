import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";

import styles from "./SignInUp.module.css";

import notify from "./../../Utils/Helpers/notifyToast";
import { validateEmail } from "./Helpers/validateEmail";
import { signupUser } from "./../../Services/auth.service";

import { SIGN_UP_DATA } from "./../../Utils/Constants/StaticData";

import Button from "../Button";
import BottomText from "./Helpers/BottomText";
import { StyledMUIInput } from "./../../Utils/Helpers/styledMUIInput";

import { connectWallet } from "./../../Services/blockchain.services.js";
import { useEffect } from "react";
import { ethers } from "ethers";


export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

function SignUp() {
  const [, setCookie] = useCookies();

  const [isDisabled, setIsDisabled] = useState(false);
  const formRef = useRef(null);

  const [currentAccount, setCurrentAccount] = useState("");

  const handleSubmit = async (e) => {
    setIsDisabled(true);
    e.preventDefault();

    const validation = handleDataValidation();

    if (validation) {
      let signUpUserData = {
        name: formRef.current.Name.value,
        mobile: parseInt(formRef.current.Mobile.value),
        email: formRef.current.SignUpEmail.value,
        password: formRef.current.SignUpPassword.value,
        walletAddress: currentAccount,
      };

      console.log("signUpUserData", signUpUserData);
      try {
        const authToken = await signupUser(signUpUserData);
        console.log("signupStatus", authToken);
        setCookie("token", authToken, {
          sameSite: "strict",
          path: "/",
        });
      } catch (err) {
        notify(err.response.data, "error");
        console.log(err.response.data);
      }
    }

    setIsDisabled(false);
  };

  useEffect(() => {
    setCurrentAccount(currentAccount);
  }, [currentAccount]);

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    try {
      let currentaccount = null;
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(account[0]);
        currentaccount = account[0];
        console.log(currentaccount);
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      return { signer, currentaccount };
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataValidation = () => {
    if (formRef.current.elements.Name.value === "") {
      notify("Please enter your name", "warning");
      return false;
    }
    if (
      !formRef.current.elements.SignUpEmail.value ||
      !validateEmail(formRef.current.elements.SignUpEmail.value)
    ) {
      notify("Please enter valid Email address", "warning");
      return false;
    }

    if (formRef.current.elements.SignUpPassword.value.length < 6) {
      notify("Password should be atleast 6 characters long", "warning");
      return false;
    }
    if (
      formRef.current.elements.ConfirmPassword.value.length !==
      formRef.current.elements.SignUpPassword.value.length
    ) {
      notify("Confirm password should be same as password", "warning");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.Title}>{SIGN_UP_DATA.title}</h2>
      <form className={styles.Form} onSubmit={handleSubmit} ref={formRef}>
      <StyledMUIInput
        fullWidth
        id="Name"
        label="Name"
        variant="standard"
        disabled={isDisabled}
      />
      <StyledMUIInput
        fullWidth
        id="SignUpEmail"
        label="Email address"
        variant="standard"
        type="email"
        margin="dense"
        autoComplete="username"
        disabled={isDisabled}
      />

      <StyledMUIInput
        fullWidth
        label="Mobile"
        name="Mobile"
        id="Mobile"
        variant="standard"
        margin="dense"
        disabled={isDisabled}
      />
      <StyledMUIInput
        fullWidth
        id="SignUpPassword"
        label="Password"
        variant="standard"
        type="password"
        margin="dense"
        autoComplete="current-password"
        disabled={isDisabled}
      />
      <StyledMUIInput
        fullWidth
        id="ConfirmPassword"
        label="Confirm Password"
        variant="standard"
        type="password"
        margin="dense"
        autoComplete="current-password"
        disabled={isDisabled}
      />
      <Button
        name={currentAccount ? shortenAddress(currentAccount) : "Connect Wallet"}
        primaryColor={isDisabled ? "var(--ter-black)" : "var(--primary-blue)"}
        wrapperClass={styles.connectWallet}
        onClick={handleConnectWallet}
      />
      <Button
        name={isDisabled ? "Loading..." : "Continue"}
        primaryColor={isDisabled ? "var(--ter-black)" : "var(--primary-blue)"}
        wrapperClass={styles.ButtonWrapper}
        inverted
        onClick={handleSubmit}
      />
      </form>
      <div className={styles.BottomSecWrapper}>
        <BottomText data={SIGN_UP_DATA} />
      </div>
    </div>
  );
}

export default SignUp;
