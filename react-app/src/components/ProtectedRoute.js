import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

const ProtectedRoute = ({ children, isAuthenticated, requiredRole, userRole }) => {
  if (!isAuthenticated) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يتم تسجيل الدخول
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // منع الوصول إذا كان المستخدم لا يمتلك الدور المطلوب
    return <Navigate to="/" />;
  }

  // السماح بالوصول إذا تم تسجيل الدخول و/أو الدور صحيح
  return children;
};



// const handleUnauthorizedAccess = () => {
//   toast.error("Access denied. You don't have permission to view this page.");
// };


export default ProtectedRoute;
