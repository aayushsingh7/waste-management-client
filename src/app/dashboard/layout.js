"use client";

import Button from "@/components/ui/Button";
import { useAppContext } from "@/context/ContextAPI";
import VerifyUser from "@/layouts/VerifyUser";
import styles from "@/styles/layouts/DashboardLayout.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { GoGift } from "react-icons/go";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const layout = ({ children }) => {
  const router = useRouter();
  const { verifyingUser, user, showNavbar, setShowNavbar } = useAppContext();
  return (
    <div className={styles.page}>
      {/* {createRecord && <AddRecord />} */}
      <nav
        className={`${styles.container} ${
          showNavbar ? styles.show : styles.hide
        }`}
      >
        <div className={styles.logo}>
          {/* <SiCashapp /> */}
          <p>FinSphere</p>
          <Button
            onClick={() => setShowNavbar(false)}
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
        </div>
        <div className={styles.split_children}>
          <ul>
            <li>
              <Link href={"/dashboard"}>
                <MdOutlinePendingActions style={{ fontSize: "23px" }} />
                <span>Pending Requests</span>
              </Link>
            </li>
            <li>
              <Link href={"/dashboard/history"}>
                <RiMoneyRupeeCircleLine style={{ fontSize: "24px" }} />
                <span>Transaction History</span>
              </Link>
            </li>

            {user && user.role !== "buyer" ? (
              <li>
                <Link href={"/dashboard/redeem"}>
                  <GoGift style={{ fontSize: "22px" }} />
                  <span>Redeem Rewards</span>
                </Link>
              </li>
            ) : null}
          </ul>

          <ul>
            <li>
              <Link href={"/dashboard"}>
                <IoSettings />
                <span>Settings</span>
              </Link>
            </li>

            <li>
              <Link href={"/logout"}>
                <IoLogOut />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {verifyingUser && <VerifyUser />}
      {children}
    </div>
  );
};

export default layout;
