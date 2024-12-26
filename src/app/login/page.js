"use client";

import { FC, useState } from "react";
import styles from "@/styles/pages/LoginAndRegister.module.css";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useAppContext } from '@/context/AppContext'

const LoginPage = ({}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    let name = e.target.name;
    setUserDetails((data) => {
      return { ...data, [name]: e.target.value };
    });
  };

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const loginUser = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userDetails.email,
            password: userDetails.password,
          }),
        }
      );
      let response = await loginUser.json();
      if (loginUser.status == 200) {
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
        <h2>Welcome Back🎉</h2>
        {/* <div className={styles.banner}>
          <h4>🚀Please use these credentials to login</h4>
          <p>Email: d@gmail.com</p>
          <p>Password: d</p>
        </div> */}
        <div className={styles.inputs}>
          <Input
            name="email"
            type="email"
            required
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Email"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "20px",
              background: "var(--secondary-background)",
            }}
          />
          <Input
            name="password"
            type="password"
            required
            onChange={(e) => handleUserInput(e)}
            placeholder="Enter Your Password"
            border={true}
            style={{
              padding: "15px 20px",
              marginTop: "10px",
              background: "var(--secondary-background)",
            }}
          />
          {error && (
            <p style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
              {error}
            </p>
          )}
          <Button
            disabled={loading}
            onClick={login}
            style={{
              fontSize: "0.8rem",
              background: "var(--active-background)",
              padding: "15px 30px",
              marginTop: "40px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            {loading ? "Please Wait..." : "Login"}
          </Button>
        </div>
      </form>
      <p>
        Doesn't have an account? <Link href={"/register"}>Register now</Link>
      </p>
    </div>
  );
};

export default LoginPage;