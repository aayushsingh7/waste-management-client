"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppContext } from "@/context/ContextAPI";
import Notification from "@/libs/notification";
import { getSocket } from "@/libs/socket";
import { useState } from "react";
import styles from "../styles/layouts/ViewRequest.module.css";
import { AiOutlineClose } from "react-icons/ai";

const ViewRequest = ({}) => {
  const {
    viewRequest,
    selectedRequest,
    user,
    setViewRequest,
    deleteData,
    setSelectedRequest,
  } = useAppContext();
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const orderCompleted = async () => {
    setLoading(true);
    try {
      const changeStatus = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/buy?productId=${selectedRequest._id}&&sellerId=${selectedRequest.seller._id}&&finalPrice=${finalPrice}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      let response = await changeStatus.json();
      if (changeStatus.status == 200) {
        let socket = getSocket();
        socket.emit("transaction_completed", selectedRequest._id, [
          selectedRequest?.seller._id,
          selectedRequest?.buyer?._id,
        ]);
        setViewRequest(false);
        setSelectedRequest({ items: [] });
      }
    } catch (err) {
      Notification.error(
        "Cannot complete request at this moment, try again later"
      );
    }
    setLoading(false);
  };

  const cancleRequest = async () => {
    try {
      const cancle = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/cancle?buyerId=${user._id}&productId=${selectedRequest._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      let data = await cancle.json();
      if (cancle.status == 200) {
        let socket = getSocket();
        socket.emit("new_request", data.response.product, [
          data.response.product.seller._id,
          data.response.product.buyer._id,
        ]);
        deleteData("pendingReq", data.response.product._id);
        Notification.success("Request cancelled successfully");
        setViewRequest(false);
      }
    } catch (err) {
      Notification.error(
        "Cannot cancle request at this moment, try again later"
      );
    }
  };

  return (
    <section
      className={`${styles.request_details_section} ${
        viewRequest ? styles.show : styles.hide
      }`}
    >
      <div className={styles.request_details}>
        <div className={styles.header}>
          <h4>Details</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className={`status_span ${selectedRequest.status}`}>
              {selectedRequest.status}
            </span>

            <Button
              onClick={() => setViewRequest(false)}
              style={{
                background: "#222222",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                marginLeft: "10px",
                border: "2px solid var(--light-border-color)",
              }}
            >
              <AiOutlineClose
                style={{ color: "var(--primary-color)", marginRight: "0px" }}
              />
            </Button>
          </div>
        </div>

        <div className={styles.image}>
          <img src={selectedRequest.image} alt="" />
        </div>

        <div className={styles.details}>
          {/* <h5>Normal Waste 2k</h5> */}
          <h6>Buyer Details</h6>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{selectedRequest?.buyer?.username}</td>
              </tr>

              <tr>
                <td>Phone no</td>
                <td>{selectedRequest?.buyer?.phoneNo}</td>
              </tr>

              <tr>
                <td>Address</td>
                <td>{selectedRequest?.buyer?.locationTxt}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.details}>
          {/* <h5>Normal Waste 2k</h5> */}
          <h6>Seller Details</h6>
          <table>
            <tbody>
              <tr>
                <td>Request ID</td>
                <td>{selectedRequest?._id}</td>
              </tr>

              <tr>
                <td>Username</td>
                <td>{selectedRequest?.seller?.username}</td>
              </tr>

              <tr>
                <td>Phone no</td>
                <td>{selectedRequest?.seller?.phoneNo}</td>
              </tr>

              <tr>
                <td>Address</td>
                <td>{selectedRequest?.locationTxt}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.details}>
          <h6>Waste Details</h6>
          <table>
            <tbody>
              {selectedRequest.items.map((item) => {
                return (
                  <tr key={Math.random() * 10000000000}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {user.role == "buyer" && selectedRequest.status !== "completed" && (
          <div className={styles.details}>
            <h6>Complete Transaction</h6>

            <Input
              type="number"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              placeholder="Enter Final Price"
              border={true}
              style={{
                padding: "15px 20px",
                marginTop: "10px",
                background: "var(--secondary-background)",
              }}
            />
            <Button
              onClick={orderCompleted}
              disabled={loading}
              style={{
                padding: "15px",
                width: "100%",
                fontSize: "0.8rem",
                marginTop: "20px",
                background: "var(--active-background)",
              }}
            >
              {loading ? "Please wait..." : "Request Completed"}
            </Button>
            <Button
              onClick={cancleRequest}
              disabled={loading}
              style={{
                padding: "15px",
                width: "100%",
                fontSize: "0.8rem",
                marginTop: "20px",
                background: "#910a0a",
              }}
            >
              {loading ? "Please wait..." : "Cancle Request"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewRequest;
