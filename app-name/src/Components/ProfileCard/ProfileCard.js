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
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error(err);
      setError("Could not load profile. Please try again.");
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
      console.error(err);
      setError("Update failed. Please try again.");
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
