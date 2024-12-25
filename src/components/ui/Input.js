import React from "react";

const Input = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  border = false,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`input ${className} ${border ? "input-border" : ""}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
