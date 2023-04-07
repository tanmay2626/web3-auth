import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import WalletInfo from "../components/WalletInfo";

const Wallet = (props) => {
  const [walletAddress, setWalletAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
  });

  useEffect(() => {
    const SetWallet = async () => {
      try {
        if (isConnected) {
          setWalletAddress(address);
        } else {
          const isLoggedIn = await magic.user.isLoggedIn();
          if (isLoggedIn) {
            const metaData = await magic.user.getMetadata();
            const magicAddress = metaData.issuer.split(":")[2];
            setWalletAddress(magicAddress);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    SetWallet();
  });

  return (
    <>
      {walletAddress ? (
        <WalletInfo walletAddress={walletAddress} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Wallet;
