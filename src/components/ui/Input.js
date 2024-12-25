import React from "react";

const Input = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <input
      type={type}
      className={`input ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export default Input;
