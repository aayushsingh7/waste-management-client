"use client";

import styles from "@/styles/layouts/DashboardLayout.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoGift } from "react-icons/go";
import { IoLogOut, IoSettings } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";

const layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className={styles.page}>
      {/* {createRecord && <AddRecord />} */}
      <nav className={styles.container}>
        <div className={styles.logo}>
          <SiCashapp />
          <p>FinSphere</p>
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

            <li>
              <Link href={"/dashboard/redeem"}>
                <GoGift style={{ fontSize: "22px" }} />
                <span>Redeem Rewards</span>
              </Link>
            </li>
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
      {children}
    </div>
  );
};

export default layout;
