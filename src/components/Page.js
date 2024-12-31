"use client";

import { useAppContext } from "@/context/ContextAPI";
import AddRequest from "@/layouts/AddReqest";
import Notification from "@/libs/notification";
import { disconnectSocket, getSocket } from "@/libs/socket";
import { useEffect } from "react";

const Page = ({ children }) => {
  const { createNew, user, addData, deleteData, changeSeller } =
    useAppContext();

  useEffect(() => {
    if (user._id) {
      const socket = getSocket();
      socket.on("new_request_received", (req) => {
        addData(false, "pendingReq", req);
        if (user.role == "buyer") {
          Notification.info("New request received.");
        }
      });
      socket.on("transaction_completed_noti", (requestId) => {
        deleteData("pendingReq", requestId);
        let text =
          user.role == "seller"
            ? "Transaction completed successully. Coins will be sent to your account."
            : "Transaction completed successfully.";
        Notification.success(text);
      });

      socket.emit("user_connect", user._id);
      return () => {
        disconnectSocket();
      };
    }
  }, [user._id]);

  return (
    <div className="dashboard_page">
      {createNew && <AddRequest />}
      {children}
    </div>
  );
};

export default Page;
