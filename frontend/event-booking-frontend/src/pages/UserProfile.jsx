import React, { useEffect, useState } from "react";
import "./Styles/UserProfile.css";
import { getUserProfile, updateUserProfile } from "../services/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const userData = await getUserProfile(token);
          if (userData && userData.data) {
            setUser(userData.data);
            setFormData(userData.data); // Initialize form data
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const updatedUser = await updateUserProfile(token, formData);
      setUser(updatedUser.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture || "/default-avatar.png"} alt="Profile" className="profile-image" />
        <div>
          <h2>{formData.name}</h2>
          <p className="leet-id">LeetCode ID: {formData.leetcodeId || "Not Provided"}</p>
        </div>
      </div>

      <div className="profile-content">
        <nav className="sidebar">
          <ul>
            <li className="active">Basic Info</li>
            <li>Points</li>
            <li>Account</li>
            <li>Lab</li>
            <li>Privacy</li>
            <li>Notifications</li>
            <li>Billing</li>
            <li>Orders</li>
          </ul>
        </nav>

        <div className="profile-details">
          <h3>Basic Info</h3>
          <div className="info">
            <p>
              <strong>Name:</strong>
              {editMode ? (
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              ) : (
                formData.name
              )}
            </p>
            <p>
              <strong>Gender:</strong>
              {editMode ? (
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
              ) : (
                formData.gender
              )}
            </p>
            <p>
              <strong>Location:</strong>
              {editMode ? (
                <input type="text" name="location" value={formData.location} onChange={handleChange} />
              ) : (
                formData.location
              )}
            </p>
            <p>
              <strong>Birthday:</strong>
              {editMode ? (
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
              ) : (
                formData.birthday
              )}
            </p>
            <p>
              <strong>Summary:</strong>
              {editMode ? (
                <textarea name="summary" value={formData.summary} onChange={handleChange} />
              ) : (
                formData.summary
              )}
            </p>
          </div>

          <h3>Social Accounts</h3>
          <div className="social-links">
            <p>
              <strong>Github:</strong>
              {editMode ? (
                <input type="text" name="github" value={formData.github} onChange={handleChange} />
              ) : (
                <a href={formData.github}>{formData.github}</a>
              )}
            </p>
            <p>
              <strong>LinkedIn:</strong>
              {editMode ? (
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              ) : (
                <a href={formData.linkedin}>{formData.linkedin}</a>
              )}
            </p>
            <p><strong>Email:</strong> {user.email} <span className="disabled-edit"></span></p>
          </div>

          {/* Buttons */}
          <div className="profile-actions">
            {editMode ? (
              <>
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
