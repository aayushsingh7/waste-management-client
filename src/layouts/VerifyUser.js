"use client";

import { useAppContext } from "@/context/ContextAPI";
import React, { useEffect } from "react";

const VerifyUser = () => {
  const { setVerifyingUser, addData } = useAppContext();
  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      let userData = await user.json();
      if (user.status == 200) {
        addData(true, "user", userData.user);
        setVerifyingUser(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="verify_container">
      <div>
        <div className="loader_2"></div>
        <p>This Dashboard is Loading...</p>
      </div>
    </div>
  );
};

export default VerifyUser;
