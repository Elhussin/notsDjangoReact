import React from 'react';
import {logoutUser, getUsers} from '../Api/api'; // استدعاء دوال من api.js
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();

  // const fetchUser = async () => {
  //   try {
  //     const response = await getUsers();
  //     console.log(response)

  //   } catch (err) {
  //   } finally {

  //   }
  // };
  // fetchUser()

  // const handleLogout = () => {
  //   logoutUser();
  //   navigate('/login');
  // };



  return <div>Welcome to the Home Page!
     {/* <button onClick={handleLogout}>Logout</button> */}
  </div>;
};

export default Home;
