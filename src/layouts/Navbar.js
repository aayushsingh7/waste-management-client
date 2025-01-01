"use client";

import { FC } from "react";
import styles from "@/styles/layouts/Navbar.module.css";
import Link from "next/link";
import { SiCashapp } from "react-icons/si";
import { useAppContext } from "@/context/ContextAPI";
import { IoIosMenu } from "react-icons/io";
import Button from "@/components/ui/Button";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = ({}) => {
  const { setShowHomeNavbar, showHomeNavbar } = useAppContext();

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span onClick={() => setShowHomeNavbar(!showHomeNavbar)}>
              <IoIosMenu />
            </span>
            <p>FinSphere</p>
          </div>

          {showHomeNavbar && (
            <Button
              onClick={() => setShowHomeNavbar(false)}
              style={{
                background: "#222222",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "2px solid var(--light-border-color)",
              }}
            >
              <AiOutlineClose
                style={{ color: "var(--primary-color)", marginRight: "0px" }}
              />
            </Button>
          )}
        </div>
        <ul className={showHomeNavbar ? styles.show : styles.hide}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"#how"}>How it works</Link>
          </li>
          <li>
            <Link href={"#features"}>Features</Link>
          </li>
          <li>
            <Link href={"/login"} className={styles.high}>
              Login/Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
