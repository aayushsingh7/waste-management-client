"use client";

import { useAppContext } from "@/context/ContextAPI";
import AddRequest from "@/layouts/AddReqest";
import React from "react";

const Page = ({ children }) => {
  const { createNew } = useAppContext();
  return (
    <div className="dashboard_page">
      {createNew && <AddRequest />}
      {children}
    </div>
  );
};

export default Page;
