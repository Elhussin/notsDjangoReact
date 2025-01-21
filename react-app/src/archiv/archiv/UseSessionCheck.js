import { useEffect, useState } from "react";

import axiosInstance from "../../Api/axiosConfig1";

const useSessionCheck = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get("/session-check/", {
          withCredentials: true, // لضمان إرسال الكوكيز
        });
        setIsAuthenticated(response.data.is_authenticated);
        setUser(response.data.user);
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkSession();
  }, []);

  return { user, isAuthenticated };
};

export default useSessionCheck;
