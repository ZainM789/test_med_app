import './Login.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      navigate('/');
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  // Added onReset handler
  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="Login-outer">
      <main>
        <div className="Login-center-padding">
          <h1 className="Login-title"><span>Login</span></h1>
          <p className="Login-signup">
            Are you a new member?{' '}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>
          <div className="Login-form-container">
            <form id="loginForm" autoComplete="off" onSubmit={login} onReset={handleReset}>
              <div className="Login-form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="login-email"
                  id="login-email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="Login-form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="login-password"
                  id="login-password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="Login-form-buttons">
                <button type="submit" className="Login-submit-btn">
                  Login
                </button>
                <button type="reset" className="Login-reset-btn">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
