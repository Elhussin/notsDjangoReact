import React, { createContext, useContext, useState } from "react";

// إنشاء Context
const UserContext = createContext(null);

// مزود (Provider) لتمرير بيانات المستخدم
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log("UserProvider Initialized:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// دالة مخصصة للوصول إلى الـ Context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.error("useUser called outside of UserProvider!");
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
