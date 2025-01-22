import React from "react";
import { useNavigate } from "react-router-dom";
import {useEffect } from "react";

const CCHIDetails = ({ data }) => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(data); // افحص بنية البيانات
      }, [data]);

  const handleNavigate = (insurancePlansIndex) => {
    navigate(`/elgipelty`, { state: { data, insurancePlansIndex } });
  };
    if (!data || Object.keys(data).length === 0) {
    return <p>NO Data</p>;
  }

  console.log("data",data)
  return (
    <div className="font-sans p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">Details</h1>

      {/* General Information Section */}
      <div className="border-b border-gray-300 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">General Information</h2>
        <p className="mb-2"><span className="font-bold">Document ID:</span> {data.documentId}</p>
        <p className="mb-2"><span className="font-bold">Full Name:</span> {data.fullName}</p>
        <p className="mb-2"><span className="font-bold">Gender:</span> {data.gender}</p>
      </div>

      {/* Insurance Plans Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Insurance Plans</h2>
        {data.insurancePlans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
          >
            <p className="mb-2"><span className="font-bold">Member Card ID:</span> {plan.memberCardId}</p>
            <p className="mb-2"><span className="font-bold">Policy Number:</span> {plan.policyNumber}</p>
            <p className="mb-2"><span className="font-bold">Expiry Date:</span> {new Date(plan.expiryDate).toLocaleDateString()}</p>
            <p className="mb-2"><span className="font-bold">Patient Share:</span> {plan.patientShare}%</p>
            <p className="mb-2"><span className="font-bold">Max Limit:</span> {plan.maxLimit}</p>
            <p className="mb-2"><span className="font-bold">Issue Date:</span> {new Date(plan.issueDate).toLocaleDateString()}</p>
            <p className="mb-2"><span className="font-bold">Network ID:</span> {plan.networkId}</p>
            <p className="mb-2"><span className="font-bold">Class Name:</span> {plan.policyClassName}</p>
            <p className="mb-2"><span className="font-bold">Policy Holder:</span> {plan.policyHolder}</p>

            {/* Navigate Button */}
            <button
              onClick={() => handleNavigate(index)}
              className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200"
            >
              Elgipelty
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CCHIDetails;
