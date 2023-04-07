import { magic } from "../libs/magic";
import React from "react";

const Wallets = (props) => {
  async function onSubmit() {
    await magic.oauth.loginWithRedirect({
      provider: "google",
      redirectURI: "http://localhost:3000/callback", // required redirect to finish social login
    });
  }

  return (
    <div className="wallets">
      <button
        type="submit"
        className="social-btn"
        onClick={() => {
          onSubmit();
        }}
      >
        SignIn with Google
      </button>
    </div>
  );
};

export default Wallets;
