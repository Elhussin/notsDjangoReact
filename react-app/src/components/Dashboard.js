import React from 'react';
// import Grid2 from '@mui/material/Unstable_Grid2';
import { Grid2,Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">User Statistics</Typography>
          {/* Add content here */}
        </Paper>
      </Grid2>
      <Grid2 item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Order Summary</Typography>
          {/* Add content here */}
        </Paper>
      </Grid2>
      <Grid2 item xs={12} sm={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Sales Overview</Typography>
          {/* Add content here */}
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
// <>
// <Button color="inherit">
//   <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin</Link>
// </Button>
// <Button color="inherit">
//   <Link to="/branch" style={{ color: 'white', textDecoration: 'none' }}>Branches</Link>
// </Button>
// </>