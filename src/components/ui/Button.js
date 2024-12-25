import React from "react";

const Button = ({
  type = "button",
  className = "",
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
