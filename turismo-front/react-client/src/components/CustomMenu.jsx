import React from "react";
import { Menu } from "antd";

const CustomMenu = ({ items, onClick }) => {
  return (
    <Menu
      theme="dark"
      mode="vertical"
      defaultSelectedKeys={["home"]}
      style={{ backgroundColor: "#880d1e", color: "#ffffff", height: "100%" }}
    >
      {items.map((item) => (
        <Menu.Item key={item.key} onClick={() => onClick(item.key)}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default CustomMenu;
