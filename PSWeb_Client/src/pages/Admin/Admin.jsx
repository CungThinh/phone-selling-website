import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  BankOutlined
} from "@ant-design/icons";

import UserManager from "../../components/UserManager/UserManager";
import ProductManager from "../../components/ProductManager/ProductManager";
import OrderManager from "../../components/OrderManager/OrderManager";
import PaymentManager from "../../components/PaymentManager/PaymentManager";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";

const Admin = () => {
  const items = [
    getItem("Users", "user", <UserOutlined />),
    getItem("Products", "product", <AppstoreOutlined />),
    getItem("Orders", "order", <ShoppingCartOutlined />),
    getItem("Payments", "payment", <BankOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <UserManager />;
      case "product":
        return <ProductManager />;
      case "order":
        return <OrderManager />;
      case "payment":
        return <PaymentManager />;
      default:
        return <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <NavbarAdmin />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            background: "#F0F8FF",
            boxshadow: "1px 1px 2px rgb(146, 85, 253)",
            height: "1000px",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default Admin;
