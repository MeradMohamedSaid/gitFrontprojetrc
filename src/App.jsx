import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("Discover Peers");
  const [response, setResponse] = useState([]);

  const sendMessage = async () => {
    try {
      setMessage((old) => "Loading");
      const res = await axios.get("http://localhost:8080/api/discoverPeers");
      setResponse(res.data);
      setMessage((old) => "Discover Peers");
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status other than 2xx
        console.error("Response error:", error.response);
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        alert("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        alert("An error occurred while setting up the request.");
      }
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>{message}</button>
      {response.length > 0 &&
        response.map((ele) => {
          return (
            <>
              <p>{ele}</p>
            </>
          );
        })}
    </div>
  );
};

export default App;
