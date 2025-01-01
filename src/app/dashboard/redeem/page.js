"use client";

import Page from "@/components/Page";
import RewardBox from "@/components/RewardBox";
import { useAppContext } from "@/context/ContextAPI";
import PageHeader from "@/layouts/PageHeader";
import Notification from "@/libs/notification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbCoinMoneroFilled } from "react-icons/tb";

const RewardPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (user.role == "buyer") {
      router.push("/dashboard");
    }
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    setLoading(true);
    try {
      const rewards = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rewards`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      let response = await rewards.json();
      setRewards(response.data);
    } catch (err) {
      Notification.error("Something went wrong while fetching rewards.");
    }
    setLoading(false);
  };

  return (
    <Page>
      <PageHeader heading={"Redeem Rewards"}>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--primary-color)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>
            <TbCoinMoneroFilled style={{ color: "yellow", fontSize: "23px" }} />
          </span>
          {Math.floor(user.coins).toLocaleString()}
        </p>
      </PageHeader>
      {loading ? (
        <div className="loading-template">
          <div className="loader"></div>
        </div>
      ) : rewards.length === 0 ? (
        <div className="empty-con">
          <p>No Rewards Found</p>
        </div>
      ) : (
        <div className="grid_con">
          {rewards.map((reward) => (
            <RewardBox key={reward._id} reward={reward} />
          ))}
        </div>
      )}
    </Page>
  );
};

export default RewardPage;
