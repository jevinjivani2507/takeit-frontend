import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./ProfileRightSec.module.css";

import PersonalInfoSec from "./PersonalInfoSec/PersonalInfoSec";
import OrdersSec from "./OrdersSec/index";
import WishList from "./WishList/WishList";
import BecomeASellerSec from "./BecomeASeller";
import Dashboard from "./Dashboard/Dashboard";
import SellerProducts from "./SellerProducts";
import Token from "./Token";
import SellerSafeRoute from "../../../Utils/Helpers/SellerSafeRoute";

function ProfileRightSec({ refreshUserData }) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<PersonalInfoSec />} />
        <Route path="/orders" element={<OrdersSec />} />
        <Route
          path="/wishlist"
          element={<WishList refreshUserData={refreshUserData} />}
        />
        <Route
          path="become-a-seller"
          element={
            <SellerSafeRoute reversed redirectPath="/profile/">
              <BecomeASellerSec refreshUserData={refreshUserData} />
            </SellerSafeRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <SellerSafeRoute redirectPath="/profile/">
              <Dashboard />
            </SellerSafeRoute>
          }
        />
        <Route
          path="products"
          element={
            <SellerSafeRoute redirectPath="/profile/">
              <SellerProducts />
            </SellerSafeRoute>
          }
        />
        <Route
          path="tokens"
          element={
            // <SellerSafeRoute redirectPath="/profile/">
              <Token />
            // </SellerSafeRoute>
          }
        />
        <Route path="*" element={<Navigate to="/profile/" />} />
      </Routes>
    </>
  );
}

export default ProfileRightSec;
