import React from "react";
import styles from "./Token.module.css";
import Preloader from "../../../Preloader/Preloader";
import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
import Matic  from "../../../../Assets/Socials/Matic.svg"; 

const EachToken = () => {
  return (
    <div className={styles.tokenWrapper}>
      <div className={styles.tokenImgWrapper}>
        <h4 className={styles.tokenLogo}>K</h4>
        <img src={Matic} className={styles.tokenCompanyWrapper} alt="" />
        {/* <div className={styles.tokenCompanyWrapper} /> */}
      </div>
      <div className={styles.tokenContent}>
        <h4 className={styles.tokenLogo}>Name Received for Product Review</h4>
        <h4
          className={styles.tokenLogo}
          style={{
            color: "#FF0000",
          }}
        >
          Will Expire on 24 August
        </h4>
      </div>
    </div>
  );
};

const Token = () => {
  return (
    <>
      {true ? (
        <div className={styles.Wrapper}>
          <div className={styles.TopSec}>
            <h3 className={styles.Title}>{PROFILE_DATA.tokensSec.title}</h3>
          </div>

          <div className={styles.BottomSec}>
            <EachToken />
            <EachToken />
            <EachToken />
            {/* {product.map((listItem, index) => {
              return (
                <div
                  className={styles.LIstItemWrapper}
                  key={index}
                  style={
                    index === product.length - 1 ? { borderBottom: "none" } : {}
                  }
                >
                  <SellerProductsItem itemData={listItem} />
                </div>
              );
            })} */}
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
