"use client";

import { FC, useState } from "react";
import styles from "@/styles/pages/LoginAndRegister.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useAppContext } from '@/context/AppContext'
import { BiSolidInfoCircle } from "react-icons/bi";

const RegisterPage = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seller, setSeller] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    let name = e.target.name;
    setUserDetails((data) => {
      return { ...data, [name]: e.target.value };
    });
  };

  const register = async () => {
    setLoading(true);
    try {
      const registerUser = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
          }),
        }
      );
      let response = await registerUser.json();
      if (registerUser.status === 201) {
        setUser(response.user);
        router.push("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Register Now🎯</h2>
        <div className={styles.inputs}>
          <Input
            name="name"
            type="text"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Name"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "10px",
              background: "var(--secondary-background)",
            }}
          />
          <Input
            name="email"
            type="email"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Email"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "10px",
              background: "var(--secondary-background)",
            }}
          />
          <Input
            name="password"
            type="password"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Password"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "10px",
              background: "var(--secondary-background)",
            }}
          />

          <div className={styles.seprator}>
            <button
              onClick={() => setSeller(!seller)}
              className={`${seller ? styles.active : ""} button`}
            >
              Become a Seller
            </button>
            <button
              onClick={() => setSeller(!seller)}
              className={`${!seller ? styles.active : ""} button`}
            >
              Become a Buyer
            </button>
          </div>

          <p
            className={styles.cen}
            style={{
              fontSize: "15px",
              color: "var(--secondary-color)",
              marginTop: "15px",
            }}
          >
            <span style={{ marginRight: "3px" }}>🔴</span>
            {seller ? (
              <>
                <span>Register as a seller</span> to list your waste and connect
                with nearby businesses for collection.
              </>
            ) : (
              <>
                <span>Register as a buyer</span> to discover and purchase listed
                waste for recycling or reuse.
              </>
            )}
          </p>

          {error && (
            <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
              {error}
            </p>
          )}
          <Button
            disabled={loading}
            onClick={register}
            style={{
              fontSize: "0.8rem",
              background: "var(--active-background)",
              padding: "15px 30px",
              marginTop: "40px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <p>
        Already have an account? <Link href={"/login"}>Login now</Link>
      </p>
    </div>
  );
};

export default RegisterPage;