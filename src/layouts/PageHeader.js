import { FC, ReactNode } from "react";
import { IoAddCircle } from "react-icons/io5";

const PageHeader = ({ heading, children }) => {
  return (
    <div className="page_header">
      <h2>{heading}</h2>
      {children}
    </div>
  );
};

export default PageHeader;
