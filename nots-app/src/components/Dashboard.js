// // في src/components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUsers} from '../Api/api'; // استدعاء دوال من api.js

// const Dashboard = () => {
//   // const { user } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // جلب بيانات المستخدم عند تحميل الصفحة
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const accessToken = localStorage.getItem('access_token');
//         if (!accessToken) {
//           throw new Error('User is not authenticated');
//         }
//         const data = await getUsers(accessToken);
//         setUserData(data);
//       } catch (error) {
//         setError('Failed to load user data');
//         // إعادة التوجيه إلى                  صفحة تسجيل الدخول إذا لم يكن المستخدم مصادقًا
//         // navigate('/login');
//       }
//     };

//     fetchData();
//   }, [navigate]);

  
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {userData ? (
//         <div>

//           <p><strong>Username:</strong> {userData.username}</p>
//           <p><strong>Branch:</strong> {userData.email}</p>
//           <h3>Orders:</h3>
//           {/* <ul>
//              {userData.orders.map((order) => (
//               <li key={order.id}>
//                 <p><strong>Order ID:</strong> {order.id}</p>
//                 <p><strong>Status:</strong> {order.status}</p>
//               </li>
//             ))} 
//           </ul> */}
  
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">User Statistics</Typography>
          {/* Add content here */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Order Summary</Typography>
          {/* Add content here */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Sales Overview</Typography>
          {/* Add content here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
