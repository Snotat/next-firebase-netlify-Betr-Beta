import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import Image from "next/image";
import betrbeta from "./betrbeta.jpg";
function NavBar() {
  const [isActive, setIsActive] = useState(false);

  const btnClicked = (event) => {
    setIsActive(!isActive);
  };

  return (
    <div className="allnav">
      <div className="navbar">
        <Image src={betrbeta} width={40} height={40} alt="logo" priority />
        <nav className="nav">
          <ul className={isActive ? "nava toggle" : "nava"}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/mySubscription">Subscription</Link>
            </li>
            <li>
              <Link href="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </nav>
        <button className="hamburger" onClick={btnClicked}>
          {" "}
          <div
            className={isActive ? "icon nav-icon-1 open" : "icon nav-icon-1"}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
