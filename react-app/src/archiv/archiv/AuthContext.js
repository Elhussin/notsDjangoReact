import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null,
  });

  useEffect(() => {
    // التحقق من وجود بيانات في localStorage عند تحميل الصفحة
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (token) {
      setUser({
        isLoggedIn: true,
        role: role || "user", // إذا لم يوجد دور في localStorage، اجعلها "user" كقيمة افتراضية
      });
    }
  }, []); // يتم استدعاؤه مرة واحدة عند التحميل

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوك للوصول إلى السياق بسهولة
export const useAuth = () => useContext(AuthContext);
