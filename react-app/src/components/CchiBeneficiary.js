import React, { useState } from "react";
import { cchi_get_beneficiary } from "../Api/wassel"; // API function for user registration
import { useNavigate } from "react-router-dom";
import CCHIDetails from "./CCHIDetails";
import { waseelUsers } from "../data/data" // Dummy data for users

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";



const CchiBeneficiary = () => {
  const [formData, setFormData] = useState({
    username: "",
    provider: "",
    password: "",
    patientKey: "2307701827",
    systemType: 1,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [responseDate, setResponseDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // إذا كان الحقل هو username نحدث بيانات المستخدم كاملة
    if (name === "username") {
      const selectedUser = waseelUsers.find((user) => user.username === value);
      if (selectedUser) {
        setFormData({
          ...formData,
          username: selectedUser.username,
          provider: selectedUser.provider,
          password: selectedUser.password,
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await cchi_get_beneficiary(formData);
      setMessage("CCHI get data successfully!");
      setResponseDate(response);
      console.log(response);
    } catch (err) {
      setError(err?.response?.data?.detail || "CCHI get data failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>  
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom>
        CCHI Get Beneficiary
      </Typography>

      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="ID No"
          name="patientKey"
          value={formData.patientKey}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* حقل الاختيار */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="username-label">Wassel Username</InputLabel>
          <Select
            labelId="username-label"
            name="username"
            value={formData.username}
            onChange={handleChange}
          >
            {waseelUsers.map((user) => (
              <MenuItem key={user.username} value={user.username}>
                {user.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ position: "relative", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Send"}
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: "primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Box>
    {responseDate ? (
        <CCHIDetails data={responseDate} />
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
  </>


  );
};


export default CchiBeneficiary;

// const View = (data) => {
//   if (!data || Object.keys(data).length === 0) {
//     return <p></p>;
//   }

//   return (
//     <>
//       <div>
//         <h1>Details</h1>
//         <div>
//           <h2>General Information</h2>
//           <p><strong>Document ID:</strong> {data.documentId}</p>
//           <p><strong>Full Name:</strong> {data.fullName}</p>
//           <p><strong>Gender:</strong> {data.gender}</p>
//         </div>
//         <div>
//           <h2>Insurance Plans</h2>
//           {data.insurancePlans.map((plan, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <p><strong>Member Card ID:</strong> {plan.memberCardId}</p>
//               <p><strong>Policy Number:</strong> {plan.policyNumber}</p>
//               <p><strong>Expiry Date:</strong> {new Date(plan.expiryDate).toLocaleDateString()}</p>
//               {/* <p><strong>Is Primary:</strong> {plan.isPrimary === "true" ? "Yes" : "No"}</p> */}
//               {/* <p><strong>Relation with Subscriber:</strong> {plan.relationWithSubscriber}</p> */}
//               {/* <p><strong>Coverage Type:</strong> {plan.coverageType}</p> */}
//               <p><strong>Patient Share:</strong> {plan.patientShare}%</p>
//               <p><strong>Max Limit:</strong> {plan.maxLimit}</p>
//               <p><strong>Issue Date:</strong> {new Date(plan.issueDate).toLocaleDateString()}</p>
//               <p><strong>Network ID:</strong> {plan.networkId}</p>
//               {/* <p><strong>Sponsor Number:</strong> {plan.sponsorNumber}</p> */}
//               <p><strong>Class Name:</strong> {plan.policyClassName}</p>
//               <p><strong>Policy Holder:</strong> {plan.policyHolder}</p>
//               {/* <p><strong>Payer Nphies ID:</strong> {plan.payerNphiesId}</p> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
