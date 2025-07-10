import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile().finally(() => setLoading(false));
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
        return;
      }

      // Check if we're in demo mode (auth token starts with 'demo-')
      if (authtoken.startsWith('demo-')) {
        // Use demo mode data from sessionStorage
        const demoUser = {
          name: sessionStorage.getItem("name") || "Demo User",
          email: sessionStorage.getItem("email") || "demo@example.com",
          phone: sessionStorage.getItem("phone") || "123-456-7890",
          role: sessionStorage.getItem("role") || "patient"
        };
        setUserDetails(demoUser);
        setUpdatedDetails(demoUser);
        setError("Demo Mode: Profile changes won't be saved to server");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
        setError(""); // Clear any previous errors
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      
      // Fallback to demo mode if API fails
      const demoUser = {
        name: sessionStorage.getItem("name") || "Demo User",
        email: sessionStorage.getItem("email") || "demo@example.com", 
        phone: sessionStorage.getItem("phone") || "123-456-7890",
        role: sessionStorage.getItem("role") || "patient"
      };
      setUserDetails(demoUser);
      setUpdatedDetails(demoUser);
      setError("Demo Mode: Backend unavailable - profile changes won't be saved");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedDetails.name || !updatedDetails.phone) {
      setError("Name and phone number cannot be empty.");
      return;
    }

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      // Check if we're in demo mode
      if (authtoken.startsWith('demo-')) {
        // Update sessionStorage for demo mode
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        setError("Demo Mode: Profile updated locally (not saved to server)");
        alert("Profile Updated in Demo Mode!");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        setError("");
        alert("Profile Updated Successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      // Fallback to demo mode if update fails
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      setError("Demo Mode: Backend unavailable - profile updated locally only");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {error && <p className="error-message">{error}</p>}
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email || ""}
              disabled
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.name}</h1>
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
