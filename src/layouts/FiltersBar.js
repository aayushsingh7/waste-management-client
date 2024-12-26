import { FC } from "react";
import { IoFilter } from "react-icons/io5";

const FiltersBar = ({}) => {
  return (
    <div className="filter border_both">
      <IoFilter />
      <input type="text" placeholder="Search by Name" />
    </div>
  );
};

export default FiltersBar;
