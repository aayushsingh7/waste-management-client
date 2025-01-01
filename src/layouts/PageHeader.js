"use client";

import { FC, ReactNode } from "react";
import { IoAddCircle } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { useAppContext } from "@/context/ContextAPI";

const PageHeader = ({ heading, children }) => {
  const { showNavbar, setShowNavbar } = useAppContext();
  return (
    <div className="page_header">
      <h2>
        <span onClick={() => setShowNavbar(!showNavbar)}>
          <IoIosMenu />
        </span>
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default PageHeader;
