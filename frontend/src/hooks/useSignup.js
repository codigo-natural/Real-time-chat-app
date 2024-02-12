import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext()

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputsErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data))
      setAuthUser(data)
      // setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

function handleInputsErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
