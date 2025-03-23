import React, { useEffect, useState } from "react";
import { FaUser, FaDatabase, FaCog, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import icons
import "./Styles/UserProfile.css";
import { getUserProfile, updateUserProfile } from "../services/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedSection, setSelectedSection] = useState("basicInfo"); // Track active section

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await updateUserProfile(token, formData);
      setEditMode(false);
      window.location.reload(); // Refresh page to reflect updated data
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
        {/* Sidebar with Icons */}
        <nav className="sidebar">
          <ul>
            <li 
              className={selectedSection === "basicInfo" ? "active" : ""} 
              onClick={() => setSelectedSection("basicInfo")}
            >
              <FaUser /> Basic Info
            </li>
            <li 
              className={selectedSection === "points" ? "active" : ""} 
              onClick={() => setSelectedSection("points")}
            >
              <FaDatabase /> Points
            </li>
            <li 
              className={selectedSection === "account" ? "active" : ""} 
              onClick={() => setSelectedSection("account")}
            >
              <FaCog /> Account
            </li>
          </ul>
        </nav>

        {/* Profile Details Section */}
        <div className="profile-details">
          {/* Basic Info Section */}
          {selectedSection === "basicInfo" && (
            <>
              <h3>Basic Info</h3>
              <div className="info">
                <p><strong>Name:</strong> {editMode ? <input type="text" name="name" value={formData.name} onChange={handleChange} /> : formData.name}</p>
                <p><strong>Gender:</strong> {editMode ? <input type="text" name="gender" value={formData.gender} onChange={handleChange} /> : formData.gender}</p>
                <p><strong>Location:</strong> {editMode ? <input type="text" name="location" value={formData.location} onChange={handleChange} /> : formData.location}</p>
                <p><strong>Birthday:</strong> {editMode ? <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} /> : formData.birthday}</p>
                <p><strong>Summary:</strong> {editMode ? <textarea name="summary" value={formData.summary} onChange={handleChange} /> : formData.summary}</p>
              </div>
            </>
          )}

          {/* Account Section (Now Contains Socials & Email) */}
          {selectedSection === "account" && (
            <>
              <h3>Account Settings</h3>
              <div className="account-settings">
                <p><strong>Email:</strong> {user.email} (Cannot be changed)</p>
                <p><strong>Change Password:</strong> {editMode ? <input type="password" name="password" placeholder="New Password" onChange={handleChange} /> : "********"}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>

              <h3>Social Accounts</h3>
              <div className="social-links">
                <p>
                  <FaGithub /> <strong>Github:</strong> 
                  {editMode ? (
                    <input
                      type="text"
                      name="github"
                      value={formData.socialAccounts?.github || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialAccounts: {
                            ...formData.socialAccounts,
                            github: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    formData.socialAccounts?.github ? (
                      <a href={formData.socialAccounts.github} target="_blank" rel="noopener noreferrer">
                        {formData.socialAccounts.github}
                      </a>
                    ) : (
                      "Not Provided"
                    )
                  )}
                </p>

                <p>
                  <FaLinkedin /> <strong>LinkedIn:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.socialAccounts?.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialAccounts: {
                            ...formData.socialAccounts,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    formData.socialAccounts?.linkedin ? (
                      <a href={formData.socialAccounts.linkedin} target="_blank" rel="noopener noreferrer">
                        {formData.socialAccounts.linkedin}
                      </a>
                    ) : (
                      "Not Provided"
                    )
                  )}
                </p>

                <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
              </div>
            </>
          )}

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
