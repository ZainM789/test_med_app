import './Sign_Up.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
  // State variables for form fields
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();
    if (!role) {
      setErrMsg('Please select your role.');
      return;
    }
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        name,
        email: phone,  // Adjust as needed to use a real email, not just phone
        password,
        phone,
      }),
    });
    const json = await response.json();
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", phone);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        setErrMsg(json.errors[0].msg);
      } else {
        setErrMsg(json.error);
      }
    }
  };

  // Reset form
  const handleReset = () => {
    setRole('');
    setName('');
    setPhone('');
    setPassword('');
    setErrMsg('');
  };

  return (
    <div className="Sign_Up-outer">
      <main>
        <div className="Sign_Up-center-padding">
          <h1 className="Sign_Up-title">Sign Up</h1>
          <p className="Sign_Up-login">
            Already a member? <Link to="/login" className="login-link">Login</Link>
          </p>
          <div className="Sign_Up-form-container">
            <form id="Sign_UpForm" autoComplete="off" onSubmit={register}>
              <div className="Sign_Up-form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  required
                >
                  <option value="" disabled>Select your role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
              <div className="Sign_Up-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="Sign_Up-form-group">
                <label htmlFor="phone">Email</label>
                <input
                  type="email"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="Sign_Up-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {errMsg && <div className="Sign_Up-error" style={{ color: 'red', marginBottom: '8px' }}>{errMsg}</div>}
              <div className="Sign_Up-form-buttons">
                <button type="submit" className="Sign_Up-submit-btn">Submit</button>
                <button type="button" className="Sign_Up-reset-btn" onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sign_Up;
