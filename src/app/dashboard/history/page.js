"use client";

import Page from "@/components/Page";
import ProductBox from "@/components/ProductBox";
import { useAppContext } from "@/context/ContextAPI";
import FiltersBar from "@/layouts/FiltersBar";
import PageHeader from "@/layouts/PageHeader";
import ViewRequest from "@/layouts/ViewRequest";
import Notification from "@/libs/notification";
import styles from "@/styles/pages/DashboardPage.module.css";
import { useEffect, useState } from "react";

const page = () => {
  const { addData, requestHistory, user } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user._id) {
      fetchRequestHistory();
    }
  }, [user._id]);

  const fetchRequestHistory = async () => {
    setLoading(true);
    try {
      const requests = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${
          user.role == "seller" ? `sellerId=` : `buyerId=`
        }${user._id}&&status=completed`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const response = await requests.json();
      if (requests.status == 200) {
        addData(true, "requestHistory", response.products);
      }
    } catch (err) {
      Notification.error("Oops! something went wrong, try again later");
    }
    setLoading(false);
  };

  return (
    <Page>
      <PageHeader heading={"Transaction History"}></PageHeader>
      <FiltersBar />
      <div style={{ display: "flex", flex: "1" }} className="seprator">
        <section className={styles.product_container}>
          <div
            className={`${styles.border_both} ${styles.product_details_heading}`}
          >
            <div
              style={{
                position: "sticky",
                top: "0",
                left: "0",
                background: "var(--primary-background)",
              }}
            >
              <input type="checkbox" />
              <div
                className={styles.dis}
                style={{ width: "150px", flexShrink: "0" }}
              ></div>
            </div>
            <div className={styles.feilds}>
              <span>Request ID</span>
              <span>Status</span>
              <span>{user.role == "seller" ? "Buyer" : "Seller"} Name</span>
              <span>{user.role == "seller" ? "Buyer" : "Seller"} Phone</span>
              <span>Location</span>
            </div>
          </div>
          {loading ? (
            <div className="loading-template">
              <div className="loader"></div>
            </div>
          ) : !loading && requestHistory.length === 0 ? (
            <div className="empty-con">
              <p>No Request Yet</p>
            </div>
          ) : (
            requestHistory?.map((data) => {
              return (
                <ProductBox key={Math.random() * 8100000000} data={data} />
              );
            })
          )}
        </section>
        <ViewRequest />
      </div>
    </Page>
  );
};

export default page;
