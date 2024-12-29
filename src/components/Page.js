"use client";

import { useAppContext } from "@/context/ContextAPI";
import AddRequest from "@/layouts/AddReqest";
import { disconnectSocket, getSocket } from "@/libs/socket";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Page = ({ children }) => {
  const { createNew, user, addData, deleteData } = useAppContext();

  useEffect(() => {
    console.log("user");
    const socket = getSocket();
    socket.on("connect", () => {
      console.log("user is conntected", socket.id);
    });
    socket.on("new_request_received", (req) => {
      addData(false, "pendingReq", req);
    });
    socket.on("transaction_completed_noti", (requestId) => {
      deleteData("pendingReq", requestId);
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
