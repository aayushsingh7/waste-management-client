"use client";

import Button from "@/components/ui/Button";
import { useAppContext } from "@/context/ContextAPI";
import styles from "../styles/layouts/ViewRequest.module.css";

const ViewRequest = ({}) => {
  const { viewRequest, selectedRequest } = useAppContext();

  return (
    <section
      className={styles.request_details_section}
      style={{ width: viewRequest ? "400px" : "0px" }}
    >
      <div className={styles.request_details}>
        <div className={styles.header}>
          <h4>Details</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              style={{
                padding: "8px 20px",
                fontSize: "0.58rem",
                borderRadius: "5px",
                background: "var(--active-background)",
              }}
            >
              Accept
            </Button>
            <Button
              style={{
                padding: "8px 20px",
                fontSize: "0.58rem",
                borderRadius: "5px",
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className={styles.image}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
            alt=""
          />
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
                <td>{selectedRequest?.location}</td>
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
      </div>
    </section>
  );
};

export default ViewRequest;
