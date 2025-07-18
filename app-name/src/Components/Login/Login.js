import './Login.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Load saved password when email changes
  useEffect(() => {
    if (email) {
      const savedPassword = localStorage.getItem(`password_${email}`);
      if (savedPassword) {
        setPassword(savedPassword);
      }
    } else {
      setPassword(''); // Clear password when email is empty
    }
  }, [email]);

  const login = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setIsLoading(true);

    try {
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
        
        // Save password for future logins
        localStorage.setItem(`password_${email}`, password);
        
        navigate('/');
        window.location.reload();
      } else {
        if (json.errors) {
          setErrMsg(json.errors[0].msg);
        } else {
          setErrMsg(json.error || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback: If server is not running, simulate successful login
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        console.log('Server not available, using offline mode');
        
        // Simulate successful login for demo purposes
        const mockToken = 'demo-auth-token-' + Date.now();
        sessionStorage.setItem('auth-token', mockToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', 'Demo User');
        sessionStorage.setItem('role', 'patient');
        
        // Save password for future logins (demo mode)
        localStorage.setItem(`password_${email}`, password);
        
        alert('✅ Demo Mode: Login successful!\n\n⚠️ Note: Backend server is offline.\nTo enable full functionality, please run "start-backend.bat" from the project folder.');
        navigate('/');
        window.location.reload();
      } else {
        setErrMsg('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Added onReset handler
  const handleReset = () => {
    setEmail('');
    setPassword('');
    setErrMsg('');
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
              {errMsg && <div className="Login-error" style={{ color: 'red', marginBottom: '8px' }}>{errMsg}</div>}
              <div className="Login-form-buttons">
                <button type="submit" className="Login-submit-btn" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
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
