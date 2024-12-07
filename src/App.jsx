import React, { useEffect, useState } from "react";
import axios from "axios";

import SignUpPage from "./Pages/SignUpPage";
const imagePaths = [
  "/logos/av1.png",
  "/logos/av2.png",
  "/logos/av3.png",
  "/logos/av4.png",
  "/logos/av5.png",
  "/logos/av6.png",
  "/logos/av7.png",
  "/logos/av8.png",
];

const App = () => {
  const [message, setMessage] = useState("Discover Peers");
  const [response, setResponse] = useState([]);
  const [ip, setIp] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(1);

  const getIp = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/hello");
      console.log("Your IP : ", res.data);
      setIp((oldip) => res.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    async function start() {
      setIsLoading((old) => true);
      await getIp();
      // await DiscoverPeers();
      await setIsLoading((old) => false);
    }
    start();
  }, []);

  const startNow = (name, imgId) => {
    setPhase((old) => 2);
  };

  const DiscoverPeers = async () => {
    try {
      setMessage((old) => "Loading");
      const res = await axios.get("http://localhost:8080/api/discoverPeers");
      setResponse(res.data);
      setMessage((old) => "Discover Peers");
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response);
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        alert("No response received from the server.");
      } else {
        console.error("Error:", error.message);
        alert("An error occurred while setting up the request.");
      }
    }
  };

  return (
    <>
      <div className="Main">
        {phase === 1 && (
          <>
            {<SignUpPage startNow={startNow} imagePaths={imagePaths} ip={ip} />}
          </>
        )}
      </div>
    </>
  );
};

export default App;
