import React from "react";
import "./DummyLinks.css";

const links = [
  {
    icon: "fa fa-bookmark",
    text: "System Overview",
    href: "https://www.google.com"
  },
  {
    icon: "fa fa-bolt",
    text: "CPUs",
    href: "https://www.linkedin.com"
  },
  {
    icon: "fa fa-cloud",
    text: "Networking Stack",
    href: "https://reactjs.org/"
  },
  {
    icon: "fa fa-shield",
    text: "Firewall",
    href: "https://github.com/"
  }
];

function DummyLinks(props) {
  return (
    // <Menu
    //   // theme="dark"
    //   mode="inline"
    //   className="links-container"
    //   // style={{ width: 256, background: "#222" }}
    //   defaultSelectedKeys={["2"]}
    // >
    <ul className="links-container">
      {links.map((link, i) => (
        <li className="link-item" key={i}>
          <a href={link.href} target="_blank">
            <i className={link.icon} /> {link.text}
          </a>
        </li>
      ))}
    </ul>
    //   {/* <Menu.Item key="2">nav 2</Menu.Item>
    //   <Menu.Item key="3">nav 3</Menu.Item> */}
    // </Menu>
  );
}

export default DummyLinks;
