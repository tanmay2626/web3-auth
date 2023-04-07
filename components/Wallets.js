import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const Wallets = (props) => {
  const router = useRouter();
  const { address, isConnected } = useAccount(); // to access account and connection status
  const { connect, connectors, isLoading, pendingConnector } = useConnect(); // connect to wallet

  const create = (address) => {
    const walletAddress = address;
    axios
      .post("http://localhost:8080/api/signin", { walletAddress })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isConnected && address != undefined) {
      create(address);
    }
  });

  return (
    <div className="wallets">
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          {connector.name}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}
    </div>
  );
};

export default Wallets;
