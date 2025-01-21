import React, { useState } from "react";

const FormElgipelty = () => {
  const [formData, setFormData] = useState({
    isNewBorn: false,
    fullName: "",
    documentId: "",
    documentType: "PRC",
    dob: "",
    gender: "MALE",
    nationality: "",
    maritalStatus: "",
    religion: "",
    occupation: "",
    contactNumber: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    insurancePlans: [
      {
        memberCardId: "",
        policyNumber: "",
        expiryDate: "",
        issueDate: "",
        isPrimary: false,
        relationWithSubscriber: "",
        patientShare: 0,
        maxLimit: 0,
        policyClassName: "",
        policyHolder: "",
      },
    ],
    serviceDate: "",
    benefits: false,
    discovery: false,
    validation: true,
    transfer: false,
    isEmergency: false,
    destinationId: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePlanChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlans = [...formData.insurancePlans];
    updatedPlans[index][name] = value;
    setFormData({ ...formData, insurancePlans: updatedPlans });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Beneficiary Details</h2>

      {/* General Information */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Document ID</label>
        <input
          type="text"
          name="documentId"
          value={formData.documentId}
          onChange={handleInputChange}
          className="w-full border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Document Type</label>
        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleInputChange}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="PRC">PRC</option>
          <option value="ID">ID</option>
          <option value="Passport">Passport</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      {/* Insurance Plan Details */}
      <h3 className="text-xl font-bold mt-6 mb-4">Insurance Plan</h3>
      {formData.insurancePlans.map((plan, index) => (
        <div key={index} className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Member Card ID</label>
            <input
              type="text"
              name="memberCardId"
              value={plan.memberCardId}
              onChange={(e) => handlePlanChange(index, e)}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              value={plan.policyNumber}
              onChange={(e) => handlePlanChange(index, e)}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={plan.expiryDate}
              onChange={(e) => handlePlanChange(index, e)}
              className="w-full border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default FormElgipelty;



