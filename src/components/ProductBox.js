"use client";
import { useAppContext } from "@/context/ContextAPI";
import styles from "../styles/components/ProductBox.module.css";

const ProductBox = ({ data }) => {
  const { setViewRequest, setSelectedRequest, selectedRequest } =
    useAppContext();
  return (
    <div
      className={`${styles.box} ${styles.border_both} ${
        selectedRequest._id == data._id ? styles.active : ""
      }`}
      onClick={() => {
        setViewRequest(selectedRequest._id == data._id ? false : true);
        setSelectedRequest(data);
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          left: "0",
          top: "0",
        }}
        className={styles.handler}
      >
        <input type="checkbox" />
        <div className={styles.product_image}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s"
            alt=""
          />
        </div>
      </div>

      <div className={styles.feilds}>
        <span>{data?._id}</span>
        <span>{data?.status}</span>
        <span>{data?.seller.username}</span>
        <span>{data?.seller.phoneNo}</span>
        <span>{data?.location}</span>
        {/* <span>{data.}</span> */}
      </div>
    </div>
  );
};

export default ProductBox;
