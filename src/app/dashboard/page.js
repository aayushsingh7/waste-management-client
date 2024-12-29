"use client";

import Page from "@/components/Page";
import Button from "@/components/ui/Button";
import PageHeader from "@/layouts/PageHeader";
import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/DashboardPage.module.css";
import FiltersBar from "@/layouts/FiltersBar";
import ProductBox from "@/components/ProductBox";
import { useAppContext } from "@/context/ContextAPI";
import ViewRequest from "@/layouts/ViewRequest";
import { getSocket } from "@/libs/socket";

const page = () => {
  const { addData, pendingRequests, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { setCreateNew } = useAppContext();
  const products = [
    {
      product_image: "https://via.placeholder.com/150",
      product_name: "Wireless Mouse",
      available_stock: 120,
      fulfilled_by: "Amazon",
      status: "In Stock",
      reserved_stock: 15,
      warehouse_location: "Warehouse A",
      last_restocked_at: "2024-12-20",
    },
    {
      product_image: "https://via.placeholder.com/150",
      product_name: "Bluetooth Keyboard",
      available_stock: 80,
      fulfilled_by: "eBay",
      status: "In Stock",
      reserved_stock: 10,
      warehouse_location: "Warehouse B",
      last_restocked_at: "2024-12-22",
    },
    {
      product_image: "https://via.placeholder.com/150",
      product_name: "Gaming Headset",
      available_stock: 50,
      fulfilled_by: "Best Buy",
      status: "Out of Stock",
      reserved_stock: 5,
      warehouse_location: "Warehouse C",
      last_restocked_at: "2024-12-15",
    },
    {
      product_image: "https://via.placeholder.com/150",
      product_name: "Smartphone Stand",
      available_stock: 200,
      fulfilled_by: "Shopify",
      status: "In Stock",
      reserved_stock: 25,
      warehouse_location: "Warehouse D",
      last_restocked_at: "2024-12-18",
    },
    {
      product_image: "https://via.placeholder.com/150",
      product_name: "Portable Charger",
      available_stock: 150,
      fulfilled_by: "Walmart",
      status: "In Stock",
      reserved_stock: 20,
      warehouse_location: "Warehouse E",
      last_restocked_at: "2024-12-19",
    },
  ];

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      const requests = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${
          user.role != "seller" ? `sellerId=` : `buyerId=`
        }676fcc54a0d64a0147061365&&status="pending`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const response = await requests.json();
      if (requests.status == 200) {
        console.log(response);
        addData(true, "pendingReq", response.products);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Page>
      <PageHeader heading={"Pending Requests"}>
        {user.role == "seller" && (
          <Button
            onClick={() => setCreateNew(true)}
            style={{
              padding: "12px 15px",
              background: "var(--active-background)",
              fontSize: "0.75rem",
            }}
          >
            Create New Request
          </Button>
        )}
      </PageHeader>

      <FiltersBar />
      <div style={{ display: "flex", flex: "1" }} className="seprator">
        <section className={styles.inventories_container}>
          <div
            className={`${styles.border_both} ${styles.inventories_details_heading}`}
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
              <span>Seller Name</span>
              <span>Seller Phone</span>
              <span>Location</span>
            </div>
          </div>
          {loading ? (
            <p style={{ color: "white", fontSize: "4rem" }}>Loading Requests</p>
          ) : (
            pendingRequests?.map((data) => {
              console.log("pending req,", data);
              return (
                <ProductBox key={Math.random() * 8100000000} data={data} />
              );
            })
          )}
        </section>
        {/* <ItemDetails /> */}
        <ViewRequest />
      </div>
    </Page>
  );
};

export default page;
