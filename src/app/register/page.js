"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppContext } from "@/context/ContextAPI";
import useLocation from "@/hooks/useLocation";
import styles from "@/styles/pages/LoginAndRegister.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useAppContext } from '@/context/AppContext'

const RegisterPage = ({}) => {
  const { location, err } = useLocation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seller, setSeller] = useState(true);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    locationTxt: "",
  });

  const handleUserInput = (e) => {
    let name = e.target.name;
    setUserDetails((data) => {
      return { ...data, [name]: e.target.value };
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async () => {});
  }, []);

  const register = async () => {
    setLoading(true);
    try {
      const registerUser = await fetch(
        `http://localhost:4000/api/v1/users/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
            role: seller ? "seller" : "buyer",
            phoneNo: parseInt(userDetails.phoneNo),
            locationTxt: userDetails.locationTxt,
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          }),
        }
      );
      let response = await registerUser.json();
      if (registerUser.status === 201) {
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
            name="username"
            type="text"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Username"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "10px",
              background: "var(--secondary-background)",
            }}
          />
          <Input
            name="phoneNo"
            type="text"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Phone No."
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
            name="locationTxt"
            type="text"
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Location"
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
