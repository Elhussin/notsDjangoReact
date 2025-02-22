import React, { useState } from 'react';

const PasswordResetRequest =()=>{

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }   

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5000/api/users/password-reset-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Something went wrong!');
            }

            setSuccess(true);
            setEmail('');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>Request Password Reset</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <button type="submit" disabled={loading}>Request Password Reset</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {success && <p>Password reset link sent to your email.</p>}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
      اضغط هنا
    </button>
        </div>
    );
}
