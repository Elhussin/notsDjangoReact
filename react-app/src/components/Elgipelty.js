// import React from "react";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";


const Elgipelty = () => {
    const location = useLocation();
    const { data, insurancePlansIndex } = location.state;
    console.log("data",data)
    const insurancePlans= JSON.stringify(data.insurancePlans[insurancePlansIndex], null, 2);

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

    const body={
        "isNewBorn": false,
        "beneficiary": {
            "name": data.fullName || null,
            "documentId": data.documentId || null,
            "documentType":  data.documentType || null,
            "firstName": null,
            "secondName": null,
            "thirdName": null,
            "familyName": null,
            "fullName": data.fullName || null,
            // "dob": "1995-11-01T03:00:00.000+0300",
            "gender":  data.gender || null,
            "nationality": data.nationality || null,
            "contactNumber": null,
            "email": null,
            "emergencyPhoneNumber": null,
            "bloodGroup": null,
            "fileId": null,
            "eHealthId": null,
            "residencyType": null,
            // "maritalStatus": "M",
            // "religion": null,
            // "occupation": "business",
            "preferredLanguage": null,
            "addressLine": null,
            "streetLine": null,
            "city": null,
            "state": null,
            "country": null,
            "postalCode": null,
            "isNewBorn": null,
            "plans": [
                {
                    "planId": "82991",
                    "payerId": insurancePlans.payerId,
                    "payerName": "Insurance Company Testing Payer",
                    "memberCardId": insurancePlans.memberCardId,
                    "policyNumber": insurancePlans.policyNumber,
                    "payerNphiesId": insurancePlans.payerNphiesId,
                    "tpaNphiesId": "-1",
                    "expiryDate": insurancePlans.expiryDate,
                    "relationWithSubscriber": insurancePlans.relationWithSubscriber,
                    "coverageType": insurancePlans.coverageType,
                    "patientShare": insurancePlans.patientShare,
                    "maxLimit": insurancePlans.maxLimit,
                    "coverageClassList": [
                        {
                            "type": "plan",
                            "value": "A",
                            "name": null
                        }
                    ],
                    "policyHolder": insurancePlans.policyHolder,
                    "primary": insurancePlans.isPrimary
                }
            ],
            "isEligibilityDone": true
        },
        "subscriber": null,
        "insurancePlan": {
            "planId": "82991",
            "payerId": "INS-FHIR",
            "payerName": "Insurance Company Testing Payer",
            "memberCardId": insurancePlans.memberCardId,
            "policyNumber": insurancePlans.policyNumber,
            "payerNphiesId": insurancePlans.payerNphiesId,
            "tpaNphiesId": "-1",
            "expiryDate": insurancePlans.expiryDate,
            "relationWithSubscriber": insurancePlans.relationWithSubscriber,
            "coverageType": insurancePlans.coverageType,
            "patientShare": insurancePlans.patientShare,
            "maxLimit": insurancePlans.maxLimit,
            "coverageClassList": [
                {
                    "type": "plan",
                    "value": "A",
                    "name": null
                }
            ],
            "policyHolder": insurancePlans.policyHolder,
            "primary": insurancePlans.isPrimary
        },
        "serviceDate": "2024-10-01",
        "toDate": null,
        "benefits": true,
        "discovery": false,
        "validation": true,
        "transfer": false,
        "isEmergency": false,
        "destinationId": "-1"
      }



  
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
        <div>
      <h1>Details for Plan {insurancePlansIndex + 1}</h1>

       <pre>{JSON.stringify(data.insurancePlans[insurancePlansIndex], null, 2)}</pre>
    </div>
      </form>
    );
  };
  

export default Elgipelty;
