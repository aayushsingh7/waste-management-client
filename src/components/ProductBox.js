"use client";
import styles from "../styles/components/ProductBox.module.css";

const ProductBox = ({ product }) => {
  return (
    <div className={`${styles.box} ${styles.border_both}`}>
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
          <img src={product.product_image} alt="" />
        </div>
        <h3 style={{ width: "150px" }}>{product.product_name}</h3>
      </div>

      <div className={styles.feilds}>
        <span>{product.available_stock}</span>
        <span>{product.fulfilled_by}</span>
        <span>{product.status}</span>
        <span>{product.reserved_stock}</span>
        <span>{product.warehouse_location}</span>
        <span>{`${product.last_restocked_at}`}</span>
      </div>
    </div>
  );
};

export default ProductBox;
