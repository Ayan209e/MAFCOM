import React from "react";
// import "./Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../auth/Action";

const EachUserProfile = () => {


  const [userProfile, setUserProfile] = useState({});
  const dispatch=useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const j = await dispatch(getUserProfile());
          setUserProfile(j);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);


  return (
    <div id="profileDiv">
      <div id="profileCard" className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img className="w-34 h-34 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile_picture" />
        <h2 className="text-center text-4xl font-semibold mt-3">{userProfile.firstName} {userProfile.lastName}</h2>
        <p className="text-center text-gray-600 mt-1 text-xl">{userProfile.role}</p>

        <div id="profileDetail">
          <div className="mt-5 desc" >
            <h3 className="text-xl font-semibold">Email - &nbsp;&nbsp;</h3>
            <p className="text-gray-600 mt-2"> {userProfile.email}</p>
          </div>
          <div className="mt-5 desc">
            <h3 className="text-xl font-semibold">Phone - &nbsp;&nbsp;</h3>
            <p className="text-gray-600 mt-2"> {userProfile.mobile}</p>
          </div>
        </div>

        <button className="btn btn-primary " id="profileEdit">
          EDIT
          <FontAwesomeIcon id="edit"
            icon={faPenSquare}
            className="ml-3 mb-1"
            style={{ cursor: "pointer", color: "white", scale: "1.4" }}
          />

        </button>

      </div>
    </div>
  );
}
export default EachUserProfile;
