import { Input } from "antd";
import React from "react";

const InputComponent = ({ size, placeholder, variant, style, ...rests }) => {
  
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <Input
      size={size}
      placeholder={placeholder}
      variant={variant}
      style={style}
      {...rests}
    />
  );
};

export default InputComponent;
