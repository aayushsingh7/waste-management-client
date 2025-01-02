"use client";

import React from "react";
import styles from "@/styles/components/RewardBox.module.css";
import Button from "./ui/Button";
import { TbCoinMoneroFilled } from "react-icons/tb";
import Notification from "@/libs/notification";
import { useAppContext } from "@/context/ContextAPI";

const RewardBox = ({ reward }) => {
  const { user } = useAppContext();
  return (
    <div className={styles.box}>
      <div className={styles.box_image}>
        <img src={reward.image} alt={`${reward.rewardValue} gift card`} />
      </div>
      <figcaption>
        <h5>{reward.title}</h5>
        <Button
          onClick={() =>
            user.coins < reward.coinsRequired
              ? Notification.error(
                  "You don't have enough coins to redeem this reward."
                )
              : Notification.success("Reward redeemed successfully!!")
          }
          style={{
            background: "#222222",
            padding: "8px",
            marginTop: "10px",
            width: "100%",
            fontSize: "0.7rem",
            border: "2px solid var(--light-border-color)",
          }}
        >
          <span>
            <TbCoinMoneroFilled
              style={{ color: "yellow", fontSize: "20px", marginRight: "5px" }}
            />
          </span>
          {reward.coinsRequired}
        </Button>
      </figcaption>
    </div>
  );
};

export default RewardBox;
