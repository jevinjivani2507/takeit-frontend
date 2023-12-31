import React from "react";
import { useSelector } from "react-redux";

import styles from "./BecomeASeller.module.css";

import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";

import Button from "../../../Button";
import { becomeASeller } from "./../../../../Services/user.service";
import notify from "./../../../../Utils/Helpers/notifyToast";

import { ethers } from "ethers";

import abi from "./../../../../Utils/TakeItTokenFactory.json";

function BecomeASellerSec({ refreshUserData }) {
  const userData = useSelector((state) => state.userReducer.userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;
    console.log(elements);
    console.log(elements.ShopName.value);
    console.log(elements.GstIn.value);
    console.log(elements.PickupAddress.value);
    console.log(elements.PickupPincode.value);
    console.log(elements.tokenName.value);
    console.log(elements.tokenSymbol.value);

    try {

      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0xD4b5dF769E8ebB1E93F45D1876a3432e4aB2CE25",
        abi.abi,
        signer
      );

      const tx = await contract.createTakeItToken(
        elements.tokenName.value,
        elements.tokenSymbol.value
      );

      console.log("Token created -- success",tx);


      const data = await becomeASeller(
        userData.accessToken,
        elements.ShopName.value,
        elements.GstIn.value,
        {
          address: elements.PickupAddress.value,
          pincode: elements.PickupPincode.value,
        },
        elements.tokenName.value,
        elements.tokenSymbol.value
      );
      refreshUserData();
      console.log(refreshUserData);
      notify("Successfully become a seller", "success");
    } catch (err) {
      notify(err.response.data, "error");
      console.log(err);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopSec}>
        <h3 className={styles.Title}>{PROFILE_DATA.becomeASellerSec.title}</h3>
      </div>

      <form className={styles.BottomSec} onSubmit={handleSubmit}>
        <div className={styles.KeyValuePairs}>
          {PROFILE_DATA.becomeASellerSec.feilds
            .slice(0, 2)
            .map((feild, index) => {
              return (
                <div className={styles.KeyValuePair} key={index}>
                  <h4 className={styles.Key}>{feild.label}</h4>
                  <input
                    className={styles.ValueInput}
                    type={feild.type ? feild.type : "text"}
                    placeholder={feild.placeholder}
                    id={feild.id}
                  />
                </div>
              );
            })}
          <div className={styles.KeyValuePair + " " + styles.PickupAddressPair}>
            <h4 className={styles.Key}>
              {PROFILE_DATA.becomeASellerSec.feilds[2].label}
            </h4>
            <div className={styles.PickupAddress}>
              <textarea
                className={styles.ValueInput}
                type={
                  PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[0].type
                    ? PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[0].type
                    : "text"
                }
                placeholder={
                  PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[0]
                    .placeholder
                }
                id={PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[0].id}
              />
              <input
                className={styles.ValueInput}
                type={
                  PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[1].type
                    ? PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[1].type
                    : "text"
                }
                placeholder={
                  PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[1]
                    .placeholder
                }
                id={PROFILE_DATA.becomeASellerSec.feilds[2].subFeilds[1].id}
              />
            </div>
          </div>
          <div className={styles.KeyValuePair + " " + styles.PickupAddressPair}>
            <h4 className={styles.Key}>Token Information</h4>
            <div className={styles.PickupAddress}>
              <input
                className={styles.ValueInput}
                type="text"
                placeholder={"Token Name"}
                id="tokenName"
              />
              <input
                className={styles.ValueInput}
                type="text"
                placeholder={"Token Symbol"}
                id="tokenSymbol"
              />
            </div>
          </div>
        </div>
        <p className={styles.TnC}>
          <p className={styles.TnCTitle}>
            {
              "By Clicking on 'Registers as a Seller' you agree to our  following Terms and Conditions: "
            }
          </p>
          {PROFILE_DATA.becomeASellerSec.tnc.map((value, index) => {
            return (
              <>
                <span key={index}>• {value}</span>
                <br />
              </>
            );
          })}
        </p>
        <Button
          wrapperClass={styles.RegisterBtn}
          name={PROFILE_DATA.becomeASellerSec.registerAsASeller}
          primaryColor={`var(--primary-blue)`}
        />
      </form>
    </div>
  );
}

export default BecomeASellerSec;
