import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="font-bold text-2xl">No requests found.</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connection Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={index}
            className="flex m-4 p-4 bg-base-300 rounded-sm w-1/2 mx-auto"
          >
            <div>
              <img
                alt="pic"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-blod text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{age && gender && age + ", " + gender}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
