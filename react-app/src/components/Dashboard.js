// import React from 'react';
// // import Grid2 from '@mui/material/Unstable_Grid2';
// import { Grid2,Paper, Typography } from '@mui/material';

// const Dashboard = () => {
//   return (
//     <Grid2 container spacing={3}>
//       <Grid2 item xs={12} sm={6} md={4}>
//         <Paper sx={{ padding: 2 }}>
//           <Typography variant="h6">User Statistics</Typography>
//           {/* Add content here */}
//         </Paper>
//       </Grid2>
//       <Grid2 item xs={12} sm={6} md={4}>
//         <Paper sx={{ padding: 2 }}>
//           <Typography variant="h6">Order Summary</Typography>
//           {/* Add content here */}
//         </Paper>
//       </Grid2>
//       <Grid2 item xs={12} sm={12} md={4}>
//         <Paper sx={{ padding: 2 }}>
//           <Typography variant="h6">Sales Overview</Typography>
//           {/* Add content here */}
//         </Paper>
//       </Grid2>
//     </Grid2>
//   );
// };

// export default Dashboard;
// <>
// <Button color="inherit">
//   <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
// </Button>
// <Button color="inherit">
//   <Link to="/branch" style={{ color: 'white', textDecoration: 'none' }}>Branches</Link>
// </Button>
// </>

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

// const Dashboard = () => {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Dashboard
//       </Typography>
//       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         <ListItem button component={Link} to="/">
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/Contact">
//           <ListItemText primary="Contact Us" />
//         </ListItem>
//         <ListItem button component={Link} to="/About">
//           <ListItemText primary="About Us" />
//         </ListItem>
//         <ListItem button component={Link} to="/OrderList">
//           <ListItemText primary="Order List" />
//         </ListItem>
//         <ListItem button component={Link} to="/admin">
//           <ListItemText primary="User Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/branch">
//           <ListItemText primary="Branch Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/branchmanager">
//           <ListItemText primary="Branch Manager" />
//         </ListItem>
//         <ListItem button component={Link} to="/companies">
//           <ListItemText primary="Company Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/Factories">
//           <ListItemText primary="Factory Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/Brands">
//           <ListItemText primary="Brand Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/category">
//           <ListItemText primary="Category Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/product">
//           <ListItemText primary="Product Management" />
//         </ListItem>
//         <ListItem button component={Link} to="/CchiBeneficiary">
//           <ListItemText primary="Cchi Beneficiaries" />
//         </ListItem>
//         <ListItem button component={Link} to="/elgipelty">
//           <ListItemText primary="Elgipelty" />
//         </ListItem>
//         <ListItem button component={Link} to="/Felgipelty">
//           <ListItemText primary="Elgipelty Form" />
//         </ListItem>
//         <ListItem button component={Link} to="/Logout">
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//     </Box>
//   );
// };

// export default Dashboard;

import React from 'react';
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
const Dashboard = () => {
  // قائمة العناصر مع الروابط والأيقونات
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
    {
      title: 'Cchi Beneficiaries',
      path: '/CchiBeneficiary',
      icon: <BeneficiaryIcon />,
    },
    { title: 'Elgipelty', path: '/elgipelty', icon: <FormIcon /> },
    { title: 'Elgipelty Form', path: '/Felgipelty', icon: <FormIcon /> },
    { title: 'Logout', path: '/Logout', icon: <LogoutIcon /> },
  ];

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
};

export default Dashboard;