// src/components/DocumentList.js
import React, { useEffect, useState } from 'react';
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../../Api/crm.js';

const DOCUMENTS_URL = 'crm/documents/';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({ customer: '', title: '', file: null });
  const [editingDocument, setEditingDocument] = useState(null);

  // جلب قائمة المستندات عند تحميل المكون
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    try {
      const formData = new FormData();
      formData.append('customer', newDocument.customer);
      formData.append('title', newDocument.title);
      formData.append('file', newDocument.file);

      const data = await createDocument(formData);
      setDocuments([...documents, data]);
      setNewDocument({ customer: '', title: '', file: null }); // إعادة تعيين الحقول
    } catch (error) {
      console.error('Failed to add document:', error);
    }
  };

  const handleUpdateDocument = async () => {
    try {
      const formData = new FormData();
      formData.append('customer', editingDocument.customer);
      formData.append('title', editingDocument.title);
      formData.append('file', editingDocument.file);

      const data = await updateDocument(editingDocument.id, formData);
      setDocuments(documents.map((doc) => (doc.id === data.id ? data : doc)));
      setEditingDocument(null); // إنهاء وضع التحرير
    } catch (error) {
      console.error('Failed to update document:', error);
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>قائمة المستندات</h1>

      {/* إضافة مستند جديد */}
      <div style={{ marginBottom: '20px' }}>
        <h3>إضافة مستند جديد</h3>
        <form onSubmit={handleAddDocument}>
          <input
            type="text"
            placeholder="ID العميل (اختياري)"
            value={newDocument.customer}
            onChange={(e) => setNewDocument({ ...newDocument, customer: e.target.value })}
          />
          <input
            type="text"
            placeholder="عنوان المستند"
            value={newDocument.title}
            onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
          />
          <button type="submit">إضافة</button>
        </form>
      </div>

      {/* تعديل مستند */}
      {editingDocument && (
        <div style={{ marginBottom: '20px' }}>
          <h3>تعديل مستند</h3>
          <form onSubmit={handleUpdateDocument}>
            <input
              type="text"
              placeholder="ID العميل (اختياري)"
              value={editingDocument.customer}
              onChange={(e) =>
                setEditingDocument({ ...editingDocument, customer: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="عنوان المستند"
              value={editingDocument.title}
              onChange={(e) =>
                setEditingDocument({ ...editingDocument, title: e.target.value })
              }
            />
            <input
              type="file"
              onChange={(e) =>
                setEditingDocument({ ...editingDocument, file: e.target.files[0] })
              }
            />
            <button type="submit">حفظ التعديلات</button>
            <button onClick={() => setEditingDocument(null)}>إلغاء</button>
          </form>
        </div>
      )}

      {/* قائمة المستندات */}
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID العميل</th>
            <th>عنوان المستند</th>
            <th>الملف</th>
            <th>تاريخ الرفع</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.customer || '-'}</td>
              <td>{doc.title}</td>
              <td>
                <a href={doc.file} target="_blank" rel="noopener noreferrer">
                  عرض الملف
                </a>
              </td>
              <td>{new Date(doc.uploaded_at).toLocaleString()}</td>
              <td>
                <button onClick={() => setEditingDocument(doc)}>تعديل</button>
                <button onClick={() => handleDeleteDocument(doc.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;