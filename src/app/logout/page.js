"use client";

import Page from "@/components/Page";
import Notification from "@/libs/notification";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = ({}) => {
  const router = useRouter();
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let response = await data.json();
      if (data.status == 200) {
        router.push("/login");
        Notification.success("Logout successfully");
      } else {
        router.back();
        Notification.error("Oops! something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <div
        style={{
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="loader_2"></div>
        <h1
          style={{
            color: "var(--primary-color)",
            fontSize: "1.4rem",
            marginTop: "20px",
          }}
        >
          Logging Out...
        </h1>
      </div>
    </Page>
  );
};

export default LogoutPage;
