import React, { createContext, useContext, useState, useEffect, memo, useMemo} from "react";
import { getUsersByToken } from "../Api/api"; // Import the login API function
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserContext = createContext(null);
const roleMapping = {
  "staff_superuser": "admin",
  "staff_only": "staff",
  "superuser_only": "manager",
  "none": "user",
};

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

        const Data = await getUsersByToken();
        const userData=Data[0];
        // تحديد المفتاح بدقة
        const userRoleKey = userData.is_staff // ← التصحيح هنا
        ? userData.is_superuser // ← التصحيح هنا
          ? "staff_superuser"
          : "staff_only"
        : userData.is_superuser // ← التصحيح هنا
        ? "superuser_only"
        : "none";

        // الحصول على الدور أو "user" كمؤقت
        const userRole = roleMapping[userRoleKey] || "user";

        setUser({
          username: userData.username,
          email: userData.email,
          userRole,
          id: userData.id,
        });

      }catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data. Please try again later.");
          if (error.response && error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error("Failed to fetch user data. Please try again later.");
          }
        }

    };

    fetchData();
  }, []);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={value}>
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