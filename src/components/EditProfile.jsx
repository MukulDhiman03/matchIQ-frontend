import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToat, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const i = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      {showToat && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile Updated Successfully..</span>
          </div>
        </div>
      )}

      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card  bg-base-100 shadow-xl border border-gray-200">
            <div className="card-body">
              <h2 className="card-title text-center text-2xl font-semibold">
                Edit Profile
              </h2>

              <div>
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name."
                  className="input input-bordered w-full"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name."
                  className="input input-bordered w-full"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter your age."
                  className="input input-bordered w-full"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your gender."
                  className="input input-bordered w-full"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">About</span>
                </label>
                <input
                  type="text"
                  placeholder="Write about yourself."
                  className="input input-bordered w-full"
                  required
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-medium">Photo</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your photo url."
                  className="input input-bordered w-full"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">⚠️ {error}</p>
              )}
              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
    </>
  );
};

export default EditProfile;
