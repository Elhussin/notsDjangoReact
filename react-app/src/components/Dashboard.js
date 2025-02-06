
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  ContactMail as ContactIcon,
  Info as AboutIcon,
  ListAlt as OrderIcon,
  // People as UserIcon,
  Business as BranchIcon,
  Factory as FactoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ProductIcon,
  Logout as LogoutIcon,
  BusinessCenter as CompanyIcon,
  BrandingWatermark as BrandIcon,
  Person as BeneficiaryIcon,
  Assignment as FormIcon,
} from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const items = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'Contact Us', path: '/Contact', icon: <ContactIcon /> },
  { title: 'About Us', path: '/About', icon: <AboutIcon /> },
  { title: 'Order List', path: '/OrderList', icon: <OrderIcon /> },
  { title: 'Admin Management', path: '/admin', icon: <AdminPanelSettingsIcon /> },
  { title: 'Branch Management', path: '/branch', icon: <BranchIcon /> },
  { title: 'Branch Manager', path: '/branchmanager', icon: <BranchIcon /> },
  { title: 'Company Management', path: '/companies', icon: <CompanyIcon /> },
  { title: 'Factory Management', path: '/Factories', icon: <FactoryIcon /> },
  { title: 'Brand Management', path: '/Brands', icon: <BrandIcon /> },
  { title: 'Category Management', path: '/category', icon: <CategoryIcon /> },
  { title: 'Product Management', path: '/product', icon: <ProductIcon /> },
  {title: 'Cchi Beneficiaries', path: '/CchiBeneficiary', icon: <BeneficiaryIcon />,},
  { title: 'Elgipelty', path: '/elgipelty', icon: <FormIcon /> },
  { title: 'Elgipelty Form', path: '/Felgipelty', icon: <FormIcon /> },
  { title: 'Logout', path: '/Logout', icon: <LogoutIcon /> },
  { title: 'Customer List', path: '/CustomerList', icon: <FormIcon /> },
  { title: 'Interaction List', path: '/InteractionList', icon: <FormIcon /> },
  { title: 'Complaint List', path: '/ComplaintList', icon: <LogoutIcon /> },
  { title: 'USERS ADMIN', path: '/users', icon: <ContactIcon /> },
  { title: 'Create Account', path: '/CreateAccount', icon: <FormIcon /> },
  { title: 'Account List', path: '/AccountList', icon: <FormIcon /> },
  { title: 'Tax List', path: '/TaxList', icon: <FormIcon /> },
  { title: 'Create Tax', path: '/CreateTax', icon: <FormIcon /> },
  { title: 'Category List', path: '/CategoryList', icon: <FormIcon /> },
  { title: 'Create Category', path: '/CreateCategory', icon: <FormIcon /> },
  { title: 'Transaction List', path: '/TransactionList', icon: <FormIcon /> },
  { title: 'Create Transaction', path: '/CreateTransaction', icon: <FormIcon /> },

];

const Dashboard = memo(function Dashboard() {

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.02)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                {item.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
                <Button
                  component={Link}
                  to={item.path}
                  variant="contained"
                  color="primary"
                  startIcon={item.icon}
                >
                  Go to {item.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default Dashboard;