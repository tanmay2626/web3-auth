import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDisconnect } from "wagmi";
import { magic } from "../libs/magic";
import axios from "axios";

const Profile = (props) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
    setToken(token);
  }, [router]);

  const logoutMagic = async () => {
    await magic.user.logout();
  };

  const SignOut = (e) => {
    e.preventDefault();
    disconnect();
    logoutMagic();
    localStorage.removeItem("token");
  };

  const HandleInput = (e) => {
    const { value, name } = e.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const SubmitProfile = (e) => {
    e.preventDefault();
    const username = input.username;
    const email = input.email;
    const headers = {
      Authorization: token,
    };

    axios
      .post(
        "http://localhost:8080/api/createProfile",
        { username, email },
        { headers: headers }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Username : </p>
      <p>Email : </p>

      <h2>Create Profile</h2>

      <div className="profile-update">
        <label>Username</label>
        <input type="text" name="username" onChange={HandleInput} />
        <label>Email</label>
        <input type="email" name="email" onChange={HandleInput} />
      </div>
      <button className="pad" onClick={SubmitProfile}>
        Submit
      </button>
      {error && <p>Profile already created!</p>}

      <div className="wallets pad">
        <button
          onClick={() => {
            router.push("/wallet");
          }}
        >
          MyWallet
        </button>
        <button onClick={SignOut}>SignOut</button>
      </div>
    </div>
  );
};

export default Profile;
