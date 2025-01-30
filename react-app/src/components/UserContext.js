// import React, { createContext, useContext, useState } from "react";

// // إنشاء Context
// const UserContext = createContext(null);

// // مزود (Provider) لتمرير بيانات المستخدم
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   console.log("UserProvider Initialized:", user);
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // دالة مخصصة للوصول إلى الـ Context
// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (!context) {
//     console.error("useUser called outside of UserProvider!");
//     throw new Error("useUser must be used within a UserProvider");
//   }

//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { getUsersByToken } from "../Api/api"; // Import the login API function
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const userData = await getUsersByToken();
            setUser(userData); // حفظ المستخدم في الـ context
            console.log("UserProvider Initialized:", userData);
        } catch (error) {
            // toast.error('Error fetching data!');
            console.error(error);
        }
    };
    fetchData();
}, []);

  // جلب بيانات المستخدم عند تحميل الصفحة

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// دالة مخصصة لاستخدام السياق
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
