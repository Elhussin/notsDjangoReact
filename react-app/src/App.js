// react
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// const LazyComponent = React.lazy(() => import('./LazyComponent'));

// MAin components
import About from "./components/About";
import UserManag from "./components/UserManag";
import Branch from "./components/Branch"; 
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
import NoPage from "./components/NoPage";
import Order from "./components/Order";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";
import { useUser } from "./components/UserContext"; // استخدام الـ Context لإدارة بيانات المستخدم
import Elgipelty from "./components/Elgipelty";
import CchiBeneficiary from "./components/CchiBeneficiary";
import FormElgipelty from "./components/FormElgipelty";

import CustomerList from './components/crm/CustomerList';
import InteractionList from './components/crm/InteractionList';
import ComplaintList from './components/crm/ComplaintList';
import OpportunityList from './components/crm/OpportunityList';
import TaskList from './components/crm/TaskList';
import CampaignList from './components/crm/CampaignList';
import TeamList from './components/crm/TeamList';
import DocumentList from './components/crm/DocumentList';
import AccountList from './components/account/AccountList';
import CreateAccount from './components/account/CreateAccount';
import TaxList from './components/account/TaxList';
import CreateTax from './components/account/CreateTax';
import CategoryList from './components/account/CategoryList';
import CreateCategory from './components/account/CreateCategory';
import TransactionList from './components/account/TransactionList';
import CreateTransaction from './components/account/CreateTransaction';



// layout
import Layout from "./layout/Layout";

// style
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

      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="About" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="*" element={<NoPage />} />

            {/* Protected Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  requiredRole="admin"
                  userRole={userRole}
                >
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route path="users" element={<UserManag />} />
            <Route path="branch" element={<Branch />} />
            <Route path="branchmanager" element={<BranchManager />} />
            <Route path="companies" element={<CompaniesManager />} />
            <Route path="Factories" element={<FactoriesManager />} />
            <Route path="Brands" element={<BrandsManager />} />
            <Route path="category" element={<CategoryManager />} />
            <Route path="product" element={<ProductManager />} />
            <Route path="CchiBeneficiary" element={<CchiBeneficiary />} />
            <Route path="elgipelty" element={<Elgipelty />} />
            <Route path="Felgipelty" element={<FormElgipelty />} />
            <Route path="CustomerList" element={<CustomerList />} />
            <Route path="InteractionList" element={<InteractionList />} />
            <Route path="ComplaintList" element={<ComplaintList />} />
            <Route path="AccountList" element={<AccountList />} />
            <Route path="CreateAccount" element={<CreateAccount />} />
            <Route path="TaxList" element={<TaxList />} />
            <Route path="CreateTax" element={<CreateTax />} />
            <Route path="CategoryList" element={<CategoryList />} />
            <Route path="CreateCategory" element={<CreateCategory />} />
            <Route path="TransactionList" element={<TransactionList />} />
            <Route path="CreateTransaction" element={<CreateTransaction />} />
            <Route path="OpportunityList" element={<OpportunityList />} />
            <Route path="TaskList" element={<TaskList />} />
            <Route path="CampaignList" element={<CampaignList />} />
            <Route path="TeamList" element={<TeamList />} />
            <Route path="DocumentList" element={<DocumentList />} />


          </Route>
        </Routes>
      </Router>

    </ThemeProvider>

  );
};

export default App;
