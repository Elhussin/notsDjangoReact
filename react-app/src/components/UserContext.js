import React, { createContext, useContext, useState, useEffect, memo } from "react";
import { getUsersByToken } from "../Api/api"; // Import the login API function
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext(null);

export const UserProvider = memo(({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.warn("No access token found.");
          return;
        }

        const userData = await getUsersByToken();
        console.log("User data:", userData);
        let userRole = "user";
        if (userData.staff && userData.superuser) {
          userRole = "admin";
        } else if (userData.staff && !userData.superuser) {
          userRole = "staff";
        } else if (!userData.staff && userData.superuser) {
          userRole = "manager";
        }

        setUser({
          username: userData.username,
          email: userData.email,
          userRole,
          id: userData.id,
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUser must be used within a UserProvider. Make sure you wrap your app with <UserProvider>."
    );
  }
  return context;
};