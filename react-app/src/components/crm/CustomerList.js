// src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../Api/crm.js';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ phone: '', address: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  // جلب قائمة العملاء عند تحميل المكون
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const data = await createCustomer(newCustomer);
      setCustomers([...customers, data]);
      setNewCustomer({ phone: '', address: '' }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const data = await updateCustomer(editingCustomer.id, editingCustomer);
      setCustomers(customers.map((cust) => (cust.id === data.id ? data : cust)));
      setEditingCustomer(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((cust) => cust.id !== id));
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة العملاء</h1>

      {/* إضافة عميل جديد */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة عميل جديد</h3>
        <input
          type="text"
          placeholder="رقم الهاتف"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="العنوان"
          value={newCustomer.address}
          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
        />
        <button onClick={handleAddCustomer}>إضافة</button>
      </div>

      {/* تعديل عميل */}
      {editingCustomer && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل عميل</h3>
          <input
            type="text"
            placeholder="رقم الهاتف"
            value={editingCustomer.phone}
            onChange={(e) =>
              setEditingCustomer({ ...editingCustomer, phone: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="العنوان"
            value={editingCustomer.address}
            onChange={(e) =>
              setEditingCustomer({ ...editingCustomer, address: e.target.value })
            }
          />
          <button onClick={handleUpdateCustomer}>حفظ التعديلات</button>
          <button onClick={() => setEditingCustomer(null)}>إلغاء</button>
        </div>
      )}

      {/* قائمة العملاء */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>رقم الهاتف</th>
            <th>العنوان</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button onClick={() => setEditingCustomer(customer)}>تعديل</button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;