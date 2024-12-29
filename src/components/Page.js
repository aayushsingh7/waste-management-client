"use client";

import { useAppContext } from "@/context/ContextAPI";
import AddRequest from "@/layouts/AddReqest";
import { disconnectSocket, getSocket } from "@/libs/socket";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Page = ({ children }) => {
  const { createNew, user, addData } = useAppContext();

  useEffect(() => {
    console.log("user");
    const socket = getSocket();
    socket.on("connect", () => {
      console.log("user is conntected");
    });
    socket.on("new_request_recieved", (req) => {
      console.log(req);
      addData(false, "pendingReq", req);
    });
    socket.emit("user_connect", user._id);
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="dashboard_page">
      {createNew && <AddRequest />}
      {children}
    </div>
  );
};

export default Page;
