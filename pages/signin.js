import Wallets from "../components/Wallets";
import GoogleAuth from "../components/GoogleAuth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Signin = (props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/profile");
    }
  });

  return (
    <div className="signin">
      <h1>Signin</h1>
      <Wallets />
      <p>OR</p>
      <GoogleAuth />
    </div>
  );
};

export default Signin;
