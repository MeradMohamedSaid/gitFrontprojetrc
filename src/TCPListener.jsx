import React, { useState, useEffect } from "react";
import axios from "axios";

const TCPListener = () => {
  const [port, setPort] = useState();
  const [tcpListen, setTcpListen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:8080/tcp-listener");

    webSocket.onopen = () => {
      console.log("WebSocket connected");
      setSocket(webSocket);
    };

    webSocket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    webSocket.onclose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    };

    return () => {
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.close();
      }
    };
  }, []);

  const getAvailablePort = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tcp/getAvailablePort"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get port", error);
    }
  };

  const startTCPListener = async () => {
    // Close existing socket if open and notify the other party
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("close:current-listener"); // Notify the other party
      socket.close();
    }

    const rport = await getAvailablePort();
    setPort((old) => rport);

    const newSocket = new WebSocket("ws://localhost:8080/tcp-listener");
    newSocket.onopen = () => {
      console.log("New WebSocket connected");
      setSocket(newSocket);
      newSocket.send(`start-listener:${rport}`); // Start the listener
    };

    newSocket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    newSocket.onclose = () => {
      console.log("New WebSocket disconnected");
      setSocket(null);
    };
  };

  return (
    <div className="chatdiv">
      <h1>TCP Listener</h1>
      <button onClick={startTCPListener}>Start TCP Listener</button>
      {port && <p>Listener running on port: {port}</p>}
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TCPListener;
