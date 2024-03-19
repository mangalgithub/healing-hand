

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";

function ProfilePage() {
  const navigate=useNavigate();
    const { user, loading } = useUserProfile();

  if (!user) {
    return navigate("/")
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("test@gmail.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Save changes to profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset changes
    setName("John Doe");
    setEmail("test@gmail.com");
    setPhone("123-456-7890");
    setIsEditing(false);
  };

  return (
    <div className="bg-white py-0 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
        <div className="relative px-0 py-0 bg-gray-400 mx-10 md:mx-0 shadow rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-center text-3xl font-semibold text-gray-800">
                Your Profile
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label htmlFor="name" className="leading-loose">
                    Name:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <p className="leading-loose">{name}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="leading-loose">
                    Email:
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <p className="leading-loose">{email}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="leading-loose">
                    Phone:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <p className="leading-loose">{phone}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600"
                  >
                    <span className="text-white">Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-gray-400 hover:bg-gray-500"
                  >
                    <span className="text-white">Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none bg-green-500 hover:bg-green-600"
                >
                  <span className="text-white">Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
