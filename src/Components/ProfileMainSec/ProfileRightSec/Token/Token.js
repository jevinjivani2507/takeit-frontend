import React from "react";
import styles from "./Token.module.css";
import Preloader from "../../../Preloader/Preloader";
import { PROFILE_DATA } from "../../../../Utils/Constants/StaticData";
const Token = () => {
  return (
    <>
      {true ? (
        <div className={styles.Wrapper}>
          <div className={styles.TopSec}>
            <h3 className={styles.Title}>{PROFILE_DATA.tokensSec.title}</h3>
          </div>

          <div className={styles.BottomSec}>
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
