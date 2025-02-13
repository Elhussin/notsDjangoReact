import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1); // 1: طلب إعادة التعيين، 2: تأكيد إعادة التعيين

    // دالة لطلب إعادة تعيين كلمة المرور
    const requestPasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/password/reset/', {
                email: email,
            });
            setMessage(response.data.detail);
            setStep(2); // الانتقال إلى الخطوة التالية
        } catch (error) {
            setMessage('حدث خطأ أثناء طلب إعادة تعيين كلمة المرور.');
            console.error(error);
        }
    };

    // دالة لتأكيد إعادة تعيين كلمة المرور
    const confirmPasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('كلمتا المرور غير متطابقتين.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/password/reset/confirm/', {
                uid: uid,
                token: token,
                new_password1: newPassword,
                new_password2: confirmPassword,
            });
            setMessage(response.data.detail);
            setStep(3); // الانتهاء من العملية
        } catch (error) {
            setMessage('حدث خطأ أثناء تأكيد إعادة تعيين كلمة المرور.');
            console.error(error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>إعادة تعيين كلمة المرور</h2>
            {step === 1 && (
                <form onSubmit={requestPasswordReset}>
                    <div>
                        <label>البريد الإلكتروني:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        طلب إعادة تعيين كلمة المرور
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={confirmPasswordReset}>
                    <div>
                        <label>UID:</label>
                        <input
                            type="text"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <label>Token:</label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <label>كلمة المرور الجديدة:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <label>تأكيد كلمة المرور:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 15px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        تأكيد إعادة تعيين كلمة المرور
                    </button>
                </form>
            )}

            {step === 3 && (
                <p style={{ color: 'green' }}>{message}</p>
            )}

            {message && step !== 3 && (
                <p style={{ color: 'red' }}>{message}</p>
            )}
        </div>
    );
};

export default PasswordReset;