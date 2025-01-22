// react
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// components
import About from "./components/About";
import UserManag from "./components/UserManag";
import Branch from "./components/Branch"; 
// import BranchManagerList from "./archiv/archiv/BranchManagerList"; 
import BranchManager from "./components/BranchManager"; 
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import CompaniesManager from './components/CompaniesManager';
import FactoriesManager from './components/FactoriesManager';
import BrandsManager from './components/BrandsManager';
import CategoryManager from './components/CategoryManager';
import ProductManager from './components/ProductManager';
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
// import Mesage from "./components/Message";
import NoPage from "./components/NoPage";
import Order from "./components/Order";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import { useUser } from "./components/UserContext"; // استخدام الـ Context لإدارة بيانات المستخدم
import Elgipelty from "./components/Elgipelty";
import CchiBeneficiary from "./components/CchiBeneficiary";
import FormElgipelty from "./components/FormElgipelty";
// layout
import Layout from "./layout/Layout";
// style
// import "./style/styles.css";
import "./style/RegisterForm.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  const { user } = useUser();
  const isAuthenticated = !!localStorage.getItem("access_token");
  let userRole = "user";
  if (user) {
    userRole = user.userRole;
  }

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter future={{ v7_startTransition: true }}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="About" element={<About />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/OrderList" element={<Order />} />
          {/* مسار الطلبات محمي */}
          <Route
            path="OrderList"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                requiredRole="staff"
                userRole={userRole}
              >
                <Order />
              </ProtectedRoute>
            }
          />
          {/* مسار الطلبات محمي */}
          <Route
            path="admin"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                requiredRole="admin"
                userRole={userRole}
              >
                <UserManag />
                <Order />
                <Branch />
              </ProtectedRoute>
            }
          />

          {/* مسار مدير الفرع محمي بدور "manager" */}
          {/* <Route
            path="/branch"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                requiredRole="manager"
                userRole={userRole}
              >
                <Branch />
              </ProtectedRoute>
            }
          /> */}
          <Route path="users" element={<UserManag />} />
          <Route path="branch" element={<Branch />} />
          <Route path="Logout" element={<Logout />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="branchmanager" element={<BranchManager/>} />
          {/* <Route path="branchmanager" element={<BranchManagerList/>} /> */}
          <Route path="companies" element={<CompaniesManager />} />
          <Route path="Factories" element={<FactoriesManager />} />
          <Route path="Brands" element={<BrandsManager />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="product" element={<ProductManager />} /> 
          <Route path ="CchiBeneficiary" element={<CchiBeneficiary/>}/>
          <Route path ="elgipelty" element={<Elgipelty/>}/>
          <Route path ="Felgipelty" element={<FormElgipelty/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
