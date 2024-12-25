import React from "react";
import styles from "@/styles/pages/Home.module.css";
import Navbar from "@/layouts/Navbar";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Footer from "@/layouts/Footer";

const page = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <section className={styles.hero_section}>
        <h1>Turn Trash into Treasure: Earn, Save, Repeat!</h1>
        <p>
          Empower your community and the planet by managing waste smarter. Snap
          a photo, upload it, and watch local businesses recycle it. Earn coins
          for every contribution and redeem rewards while making the world a
          cleaner place.
        </p>

        <Button
          style={{
            background: "var(--active-background)",
            padding: "15px 30px",
            marginTop: "40px",
          }}
        >
          <Link
            style={{ color: "var(--primary-color)", textDecoration: "none" }}
            href={"/login"}
          >
            Login/Register Now
          </Link>
        </Button>
      </section>
      <section className={styles.how_it_works}>
        <h2>How It Works?</h2>
        <div className={styles.steps}>
          <span className={styles.line}></span>
          <span className={styles.step_span}>1</span>
          <span className={styles.step_span}>2</span>
          <span className={styles.step_span}>3</span>
          <span className={styles.step_span}> 4</span>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <h3>Capture Waste</h3>
            <p>Snap a clear photo of the waste you want to dispose of.</p>
          </div>

          <div className={styles.step}>
            <h3>Upload & Submit</h3>
            <p>Upload the photo to our platform and provide basic details.</p>
          </div>

          <div className={styles.step}>
            <h3>Get it Collected</h3>
            <p>Nearby businesses will pick up the waste for recycling.</p>
          </div>

          <div className={styles.step}>
            <h3>Earn & Redeem</h3>
            <p>
              Earn coins for every submission and redeem them for exciting
              rewards!
            </p>
          </div>
        </div>
      </section>
      <section className={styles.features}>
        <h2>Features</h2>
        <div className={`${styles.features_con}`}>
          <div className={styles.features_box}>
            <h3>Easy Waste Uploading</h3>
            <p>
              Capture and upload a photo of your waste with a few simple clicks.
              Our user-friendly interface ensures that you can quickly document
              your waste, making the process effortless. Once uploaded, your
              request will be sent to nearby businesses ready to collect it, so
              you don’t have to worry about disposal.
            </p>
          </div>

          <div className={styles.features_box}>
            <h3>Earn Rewards with Every Pickup</h3>
            <p>
              Every time a business picks up your waste, you earn coins that can
              be accumulated and redeemed for various rewards. Whether it’s
              discounts, services, or exclusive offers, you’re incentivized to
              keep your environment clean while gaining valuable benefits in
              return.
            </p>
          </div>

          <div className={styles.features_box}>
            <h3>Supporting Local Eco-Friendly Businesses</h3>
            <p>
              By using our app, you’re not only managing waste responsibly but
              also helping nearby businesses that focus on sustainable
              practices. These local businesses work to recycle, repurpose, or
              dispose of waste in eco-friendly ways, contributing to a cleaner
              environment and supporting a green economy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default page;
