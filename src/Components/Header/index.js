import React from "react";
import { Menu } from "antd";
import "./Header.css";

function Header(props) {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "64px", background: "#222", width: "100%" }}
    >
      <Menu.Item className="left" key="1">
        My Netdata
      </Menu.Item>
      <Menu.Item className="left" key="2">
        Costa PC
      </Menu.Item>
      <Menu.Item className="right" key="3">
        <i className="fa fa-print" />
      </Menu.Item>
      <Menu.Item className="right" key="4">
        <i className="fa fa-download" />
      </Menu.Item>
      <Menu.Item className="right" key="5">
        <div>
          <i className="fa fa-bell" />
          <span className="notification-count" />
        </div>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
