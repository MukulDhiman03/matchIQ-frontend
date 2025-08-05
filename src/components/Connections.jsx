import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchConnections();
  }, []);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="font-bold text-2xl">No connections found.</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections.map((connection, index) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          connection;
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

export default Connections;
