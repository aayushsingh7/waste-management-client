import React from "react";
import styles from "@/styles/components/RewardBox.module.css";
import Button from "./ui/Button";

const RewardBox = () => {
  return (
    <div className={styles.box}>
      <div className={styles.box_image}>
        <img
          src="https://www.mobiletopup.co.uk/_next/image?url=https%3A%2F%2Fstatic.rapido.com%2Fcms%2Fsites%2F23%2F2024%2F07%2F05075007%2FAmazon-GB.png&w=3840&q=100"
          alt=""
        />
      </div>
      <figcaption>
        <h5>Amazon $5.00 gift card</h5>
        <Button
          style={{
            background: "var(--active-background)",
            padding: "8px",
            marginTop: "10px",
            width: "100%",
            fontSize: "0.7rem",
          }}
        >
          Ⓜ 6000
        </Button>
      </figcaption>
    </div>
  );
};

export default RewardBox;
