import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./ProductInfoSec.module.css";
import Ratings from "./../../Ratings/Ratings";
import { PRODUCT_PAGE_DATA } from "../../../Utils/Constants/StaticData";
import Button from "./../../Button/index";

import { ReactComponent as PlusIcon } from "../../../Assets/Product/Plus.svg";
import notify from "./../../../Utils/Helpers/notifyToast";
import { uploadImage } from "./../../../Services/storage.service";
import { shareProduct } from "../../../Services/user.service";

import { ReactComponent as Facebook } from "../../../Assets/Socials/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Socials/Instagram.svg";
import { ReactComponent as Twitter } from "../../../Assets/Socials/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../../Assets/Socials/LinkedIn.svg";
import { ReactComponent as YouTube } from "../../../Assets/Socials/YouTube.svg";

import { useCookies } from "react-cookie";

const ShareOnSocial = ({ productId }) => {
  const url = window.location.href;
  const description = "Hello, Guys I had bought this product from TakeIt";

  const [cookie, setCookie] = useCookies(["token"]);

  const handleShare = async () => {
    // console.log(cookie.token);
    try {
      const response = await shareProduct(cookie.token, productId);
      console.log(response);
    } catch (err) {
      console.log(err);
      notify("Internal Server Error", "error");
    }
  };

  function ShareWebAPI() {
    if (navigator.share) {
      navigator
        .share({
          title: description,
          url: url,
        })
        .catch((err) => alert("Error Sharing: " + err));
    }
  }
  return (
    <>
      <div className={styles.AddressTitle}>Share on:</div>
      <div className={styles.shareOnSocials}>
        {/* Facebook */}
        <div className={styles.socialIconWrapper} onClick={handleShare}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
          >
            <Facebook className={styles.socialIcon} />
          </a>
        </div>

        {/* Twitter */}
        <div className={styles.socialIconWrapper} onClick={handleShare}>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
              description
            )}`}
            target="_blank"
          >
            <Twitter className={styles.socialIcon} />
          </a>
        </div>

        {/* Pintrest */}
        <div className={styles.socialIconWrapper} onClick={handleShare}>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${url}&media=&description=${encodeURI(
              description
            )}`}
            target="_blank"
          >
            <Instagram className={styles.socialIcon} />
          </a>
        </div>

        {/* LinkdIN */}
        <div className={styles.socialIconWrapper} onClick={handleShare}>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
            target="_blank"
          >
            <LinkedIn className={styles.socialIcon} />
          </a>
        </div>

        {/* Email */}
        <div className={styles.socialIconWrapper} onClick={handleShare}>
          <a
            href={`mailto:info@example.com?&subject=You+have+to+See+this!&cc=&bcc=&body=Check+out+this+site:${url}\n${encodeURI(
              description
            )}`}
            target="_blank"
          >
            <YouTube className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </>
  );
};

function ProductInfoSec({
  productDetails,
  currentSelections,
  setCurrentSelections,
}) {
  const userData = useSelector((state) => state.userReducer.userData);

  const inputRefs = useRef([]);

  // const [currentSelections, setCurrentSelections] = useState({
  //   size: 0,
  //   address: 0,
  //   attachments: {},
  // });

  const handleFileChange = async (e, index) => {
    const [file] = e.target.files;
    try {
      if (file) {
        notify("Uploading profile picture...", "info");

        let urls = await uploadImage(file);

        setCurrentSelections({
          ...currentSelections,
          attachments: {
            ...currentSelections.attachments,
            [index]: urls[0],
          },
        });

        notify("Image updated successfully", "success");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      notify(err, "error");
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TitleInfoSec}>
        <div className={styles.Header}>
          <h5 className={styles.SellerName}>{productDetails.shop_name}</h5>
          <h4 className={styles.ProductName}>{productDetails.title}</h4>
        </div>
        <div div className={styles.ReviewsSec}>
          <Ratings rating={productDetails.star} />
          <span className={styles.NoOfRatings}>
            {productDetails.count} {PRODUCT_PAGE_DATA.reviews}
          </span>
        </div>
        <ShareOnSocial productId={productDetails._id} />
        {productDetails.requiredAttachments.length > 0 && (
          <div className={styles.CustomizableTag}>
            {PRODUCT_PAGE_DATA.customizable}
          </div>
        )}
        <h3 className={styles.Price}> {`₹${productDetails.price}`}</h3>
      </div>
      {productDetails.various_size?.length > 0 && (
        <div className={styles.SizesSec}>
          <h5 className={styles.SizesTitle}>{PRODUCT_PAGE_DATA.sizes}</h5>
          <div className={styles.SizesWrapper}>
            {productDetails.various_size.map((size, index) => (
              <div
                key={index}
                className={`${styles.Size} ${
                  currentSelections.size === index ? styles.SelectedSize : ""
                }`}
                onClick={() =>
                  setCurrentSelections({
                    ...currentSelections,
                    size: index,
                  })
                }
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      )}
      {userData?.address?.length > 0 && (
        <div className={styles.AddressSec}>
          <div className={styles.AddressTitle}>
            {PRODUCT_PAGE_DATA.deliverTo}
          </div>
          <div className={styles.AddressesWrapper}>
            {userData.address.map((address, index) => (
              <div
                key={index}
                className={`${styles.Address} ${
                  currentSelections.address === index
                    ? styles.SelectedAddress
                    : ""
                }`}
                onClick={() =>
                  setCurrentSelections({
                    ...currentSelections,
                    address: index,
                  })
                }
              >
                <div className={styles.FullAddress}>{address.address}</div>
                <div className={styles.PinCode}>{address.pincode}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {productDetails.requiredAttachments.length > 0 && (
        <div className={styles.AttachmentsSec}>
          <h5 className={styles.AttachmentsTitle}>
            {PRODUCT_PAGE_DATA.requiredAttachments}
          </h5>
          <div className={styles.AttachmentsWrapper}>
            {productDetails.requiredAttachments.map((attachment, index) => (
              <div className={styles.Attachment} key={index}>
                <div className={styles.AttachmentLeftSec}>
                  <div className={styles.AttachmentNumber}>{index + 1}</div>
                </div>
                <div className={styles.AttachmentRightSec}>
                  <div className={styles.AttachmentTitle}>
                    {attachment.title}
                  </div>
                  <div className={styles.AttachmentDesc}>
                    {attachment.description}
                  </div>
                  {currentSelections.attachments[index] ? (
                    <img
                      src={currentSelections.attachments[index]}
                      alt="attachment"
                      className={styles.AttachmentPreviewImg}
                    />
                  ) : (
                    <Button
                      name={PRODUCT_PAGE_DATA.uploadImage}
                      onClick={() => {
                        console.log("upload image");
                        inputRefs.current[index].click();
                      }}
                      primaryColor="var(--primary-blue)"
                      inverted
                      wrapperClass={styles.UploadAttachmentBtn}
                      withIcon
                      IconComp={PlusIcon}
                    />
                  )}
                  <input
                    type="file"
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    onChange={(e) => {
                      handleFileChange(e, index);
                    }}
                    // onChange={(e) => {
                    //   const file = e.target.files[0];
                    //   const reader = new FileReader();
                    //   reader.onload = (e) => {
                    //     setCurrentSelections({
                    //       ...currentSelections,
                    //       attachments: {
                    //         ...currentSelections.attachments,
                    //         [index]: e.target.result,
                    //       },
                    //     });
                    //   };
                    //   reader.readAsDataURL(file);
                    // }}
                    className={styles.AttachmentInput}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div div className={styles.SpecificationSec}>
        <h5 className={styles.SpecificationTitle}>
          {PRODUCT_PAGE_DATA.specifications}
        </h5>
        <div className={styles.SpecificationWrapper}>
          {productDetails.specification.map((specification, index) => (
            <div className={styles.Specification} key={index}>
              <div className={styles.SpecificationKey}>
                {specification.name}
              </div>
              <div className={styles.SpecificationValue}>
                {specification.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductInfoSec;
