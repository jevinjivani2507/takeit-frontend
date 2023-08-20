import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import styles from "./ProductInfoSec.module.css";
import Ratings from "./../../Ratings/Ratings";
import { PRODUCT_PAGE_DATA } from "../../../Utils/Constants/StaticData";
import Button from "./../../Button/index";

import { ReactComponent as PlusIcon } from "../../../Assets/Product/Plus.svg";
import notify from "./../../../Utils/Helpers/notifyToast";
import { uploadImage } from "./../../../Services/storage.service";

import { ReactComponent as Facebook } from "../../../Assets/Socials/Facebook.svg";
import { ReactComponent as Instagram } from "../../../Assets/Socials/Instagram.svg";
import { ReactComponent as Twitter } from "../../../Assets/Socials/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../../Assets/Socials/LinkedIn.svg";
import { ReactComponent as YouTube } from "../../../Assets/Socials/YouTube.svg";

const ShareOnSocial = () => {
  const url = window.location.href;
  const description = "Hello, Guys";

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
        <div className={styles.socialIconWrapper}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
          >
            {/* <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 30 }}
              viewBox="0 0 512 512"
              aria-label="fb"
              role="img"
            >
              <path d="m375.14,288l14.22,-92.66l-88.91,0l0,-60.13c0,-25.35 12.42,-50.06 52.24,-50.06l40.42,0l0,-78.89s-36.68,-6.26 -71.75,-6.26c-73.22,0 -121.08,44.38 -121.08,124.72l0,70.62l-81.39,0l0,92.66l81.39,0l0,224l100.17,0l0,-224l74.69,0z"></path>
            </svg> */}
            <Facebook className={styles.socialIcon} />
          </a>
        </div>

        {/* Twitter */}
        <div className={styles.socialIconWrapper}>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
              description
            )}`}
            target="_blank"
          >
            {/* <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 30 }}
              viewBox="0 0 512 512"
              aria-label="tw"
              role="img"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
            </svg> */}
            <Twitter className={styles.socialIcon} />

          </a>
        </div>

        {/* Pintrest */}
        <div className={styles.socialIconWrapper}>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${url}&media=&description=${encodeURI(
              description
            )}`}
            target="_blank"
          >
            {/* <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 30 }}
              viewBox="0 0 512 512"
              aria-label="pn"
              role="img"
            >
              <path d="m511,255.99999c0,140.86694 -114.13307,255.00001 -255.00001,255.00001c-26.32258,0 -51.61694,-4.01008 -75.47178,-11.41331c10.38508,-16.96573 25.91129,-44.72782 31.66936,-66.83468c3.08468,-11.92742 15.83468,-60.66532 15.83468,-60.66532c8.32863,15.83468 32.59476,29.30444 58.40323,29.30444c76.91129,0 132.33267,-70.74194 132.33267,-158.65525c0,-84.2117 -68.78831,-147.24194 -157.21573,-147.24194c-110.02017,0 -168.52622,73.82662 -168.52622,154.3367c0,37.42742 19.94758,84.00605 51.71976,98.8125c4.83266,2.2621 7.40323,1.23387 8.53427,-3.39315c0.82258,-3.49597 5.14113,-20.87298 7.09476,-28.89315c0.61694,-2.57056 0.30847,-4.83266 -1.74798,-7.3004c-10.38508,-12.85282 -18.81653,-36.29637 -18.81653,-58.19758c0,-56.24395 42.56855,-110.6371 115.16129,-110.6371c62.61895,0 106.5242,42.67137 106.5242,103.74799c0,68.99395 -34.85686,116.80646 -80.20162,116.80646c-24.98589,0 -43.80242,-20.66734 -37.73589,-46.06452c7.19758,-30.33266 21.07863,-63.03024 21.07863,-84.93145c0,-19.53629 -10.4879,-35.88508 -32.28629,-35.88508c-25.60282,0 -46.16734,26.4254 -46.16734,61.8992c0,22.62097 7.60887,37.83871 7.60887,37.83871s-25.19153,106.72984 -29.81855,126.67742c-5.14113,22.00403 -3.08468,53.05645 -0.9254,73.20968c-94.80242,-37.11895 -162.04839,-129.45363 -162.04839,-237.52017c0,-140.86694 114.13307,-255.00001 255.00001,-255.00001s255.00001,114.13307 255.00001,255.00001z"></path>
            </svg> */}
            <Instagram className={styles.socialIcon} />
          </a>
        </div>

        {/* LinkdIN */}
        <div className={styles.socialIconWrapper}>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
            target="_blank"
          >
            {/* <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 30 }}
              viewBox="0 0 512 512"
              aria-label="ln"
              role="img"
            >
              <path d="m132.28,479.99501l-92.88,0l0,-299.1l92.88,0l0,299.1zm-46.49,-339.9c-29.7,0 -53.79,-24.6 -53.79,-54.3a53.79,53.79 0 0 1 107.58,0c0,29.7 -24.1,54.3 -53.79,54.3zm394.11,339.9l-92.68,0l0,-145.6c0,-34.7 -0.7,-79.2 -48.29,-79.2c-48.29,0 -55.69,37.7 -55.69,76.7l0,148.1l-92.78,0l0,-299.1l89.08,0l0,40.8l1.3,0c12.4,-23.5 42.69,-48.3 87.88,-48.3c94,0 111.28,61.9 111.28,142.3l0,164.3l-0.1,0z"></path>
            </svg> */}
            <LinkedIn className={styles.socialIcon} />
          </a>
        </div>

        {/* Email */}
        <div className={styles.socialIconWrapper}>
          <a
            href={`mailto:info@example.com?&subject=You+have+to+See+this!&cc=&bcc=&body=Check+out+this+site:${url}\n${encodeURI(
              description
            )}`}
            target="_blank"
          >
            {/* <svg
              className={styles.socialIcon}
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 30 }}
              viewBox="0 0 512 512"
              aria-label="mail"
              role="img"
            >
              <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
            </svg> */}
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
        <ShareOnSocial />
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
