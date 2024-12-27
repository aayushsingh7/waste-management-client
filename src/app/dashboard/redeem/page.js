"use client";

import Page from "@/components/Page";
import RewardBox from "@/components/RewardBox";
import Button from "@/components/ui/Button";
import PageHeader from "@/layouts/PageHeader";
import React, { useState } from "react";

const page = () => {
  const [rewards, setRewards] = useState([{}, {}, {}]);
  return (
    <Page>
      <PageHeader heading={"Redeem Rewards"}>
        <p style={{ fontSize: "1rem", color: "var(--primary-color)" }}>
          Coins Available: 200
        </p>
      </PageHeader>
      <div className="grid_con">
        {rewards.map((reward) => {
          return <RewardBox key={Math.random() * 1000000} />;
        })}
      </div>
    </Page>
  );
};

export default page;
