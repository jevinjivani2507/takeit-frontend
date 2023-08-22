import React, { useState } from "react";
import styles from "./Token.module.css";
import Preloader from "../../../Preloader/Preloader";
import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import Matic from "../../../../Assets/Socials/Matic.svg";
import { useEffect } from "react";
import { getAllToken } from "../../../../Services/user.service";
import { useSelector } from "react-redux";
import notify from "../../../../Utils/Helpers/notifyToast";

const filterProductPurchaseType = (productPurchaseType) => {
  switch (productPurchaseType) {
    case "review token":
      return "product review";
    case "referral token":
      return "referral";
    case "Order token":
      return "product purchase";
    case "shared token":
      return "social media share";
    default:
      return "Buy";
  }
};

const filterTokenDate = (tokenDate, tokenReceiveType) => {
  const date = new Date(tokenDate);
  date.setDate(date.getDate() + 30);

  return date.toDateString();
};

const EachToken = (
  { tokenName, tokenReceiveType, expireDate } // tokenName, tokenReceiveType
) => {
  return (
    <div className={styles.tokenWrapper}>
      <div className={styles.tokenImgWrapper}>
        <h4 className={styles.tokenLogo}>
          {tokenName.slice(0, 1).toUpperCase()}
        </h4>
        <img src={Matic} className={styles.tokenCompanyWrapper} alt="" />
      </div>
      <div className={styles.tokenContent}>
        <h4 className={styles.tokenLogo}>
          {tokenName} Received for {filterProductPurchaseType(tokenReceiveType)}
        </h4>
        <h4
          className={styles.tokenLogo}
          style={{
            color: "#FF0000",
          }}
        >
          Will Expire on {filterTokenDate(expireDate)}
        </h4>
      </div>
    </div>
  );
};

const Token = () => {
  const userData = useSelector((state) => state.userReducer.userData);
  const [tokenList, setTokenList] = useState(null);

  useEffect(() => {
    getToeknItems();
  }, [userData]);

  const getToeknItems = async () => {
    setTokenList(null);
    try {
      const response = await getAllToken(userData.accessToken);
      setTokenList(response);
    } catch (error) {
      console.log(error);
      notify("Something went wrong", "error");
    }
  };

  return (
    <>
      {true ? (
        <div className={styles.Wrapper}>
          <div className={styles.TopSec}>
            <h3 className={styles.Title}>{PROFILE_DATA.tokensSec.title}</h3>
          </div>

          <div className={styles.BottomSec}>
            {tokenList &&
              tokenList.map((listItem, index) => {
                return (
                  <EachToken
                    key={index}
                    tokenName={listItem.token_name}
                    tokenReceiveType={listItem.token_type}
                    expireDate={listItem.token_time}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <>
          <Preloader />
        </>
      )}
    </>
  );
};

export default Token;
