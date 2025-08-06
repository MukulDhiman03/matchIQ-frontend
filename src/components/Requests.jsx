import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsSlice";

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

  const reviewReuest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(_id));
      //   console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="font-bold text-2xl text-center">No requests found.</h1>
    );
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connection Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          request.fromUserId;
        return (
          <div
            key={index}
            className="flex justify-between items-center m-4 p-4 bg-base-300 rounded-sm w-2/3 mx-auto"
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
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewReuest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewReuest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
