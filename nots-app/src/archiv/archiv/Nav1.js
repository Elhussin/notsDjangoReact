import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  // حالة المستخدم (يمكنك استبدالها بـ Context أو Redux حسب الحاجة)
  const [user, setUser] = useState({
    isLoggedIn: true, // تغيير هذه القيمة بناءً على حالة تسجيل الدخول
    role: "user",
     // القيم المتاحة: "user", "manager", "admin"
  });

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          {/* يظهر إذا كان المستخدم مسجل الدخول */}
          {user.isLoggedIn && (
            <>
              <li>
                <Link to="/OrderList">OrderList</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
          {/* يظهر إذا لم يكن المستخدم مسجل الدخول */}
          {!user.isLoggedIn && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
          {/* يظهر فقط إذا كان المستخدم Admin */}
          {user.isLoggedIn && user.role === "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
