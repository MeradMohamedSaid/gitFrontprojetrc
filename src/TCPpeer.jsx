import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TCPPeerClient = () => {
  // State variables
  const [port, setPort] = useState("");
  const [peerAddress, setPeerAddress] = useState("");
  const [peerPort, setPeerPort] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [isListenerActive, setIsListenerActive] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const websocketRef = useRef(null);

  useEffect(() => {
    websocketRef.current = new WebSocket("ws://localhost:8080/ws");

    websocketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    websocketRef.current.onmessage = (event) => {
      // Add received message to logs
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    websocketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup on component unmount
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  // Start TCP Listener Endpoint
  const startTCPListener = async () => {
    try {
      if (websocketRef.current && port) {
        // Send start listener command via WebSocket
        websocketRef.current.send(`start-listener:${port}`);
        setIsListenerActive(true);

        // Optional: Call backend to confirm listener start
        await axios.post("http://localhost:8080/api/tcp/start-listener", {
          port,
        });
      }
    } catch (error) {
      console.error("Error starting TCP listener:", error);
      setLogs((prevLogs) => [...prevLogs, `Error: ${error.message}`]);
    }
  };

  // Connect to Peer Endpoint
  const connectToPeer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/tcp/connect",
        {
          peerAddress,
          peerPort: parseInt(peerPort),
        }
      );

      if (response.data.success) {
        setIsConnected(true);
        setLogs((prevLogs) => [
          ...prevLogs,
          `Connected to ${peerAddress}:${peerPort}`,
        ]);
      }
    } catch (error) {
      console.error("Error connecting to peer:", error);
      setLogs((prevLogs) => [
        ...prevLogs,
        `Connection Error: ${error.message}`,
      ]);
    }
  };

  // Send Message Endpoint
  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/tcp/send-message",
        {
          message,
          peerAddress,
          peerPort: parseInt(peerPort),
        }
      );

      if (response.data.success) {
        setLogs((prevLogs) => [...prevLogs, `Sent: ${message}`]);
        setMessage(""); // Clear message after sending
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setLogs((prevLogs) => [...prevLogs, `Send Error: ${error.message}`]);
    }
  };

  // File Transfer Endpoint
  const sendFile = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("peerAddress", peerAddress);
    formData.append("peerPort", peerPort);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tcp/send-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setLogs((prevLogs) => [...prevLogs, `File sent: ${file.name}`]);
      }
    } catch (error) {
      console.error("Error sending file:", error);
      setLogs((prevLogs) => [
        ...prevLogs,
        `File Transfer Error: ${error.message}`,
      ]);
    }
  };

  // In your React component
  const startListener = () => {
    if (websocketRef.current) {
      websocketRef.current.send(`start-listener:${port}`);
    }
  };

  const stopListener = () => {
    if (websocketRef.current) {
      websocketRef.current.send(`stop-listener:${port}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">P2P TCP Peer Client</h1>
      <button onClick={() => startListener()}>Start Listener </button>
      <button onClick={() => stopListener()}>Stop Listener </button>
      {/* TCP Listener Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Start TCP Listener</h2>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="border p-2 flex-grow"
          />
          <button
            onClick={startTCPListener}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Start Listener
          </button>
        </div>
        {isListenerActive && (
          <p className="text-green-600">Listener Active on Port {port}</p>
        )}
      </div>

      {/* Connect to Peer Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Connect to Peer</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Peer Address"
            value={peerAddress}
            onChange={(e) => setPeerAddress(e.target.value)}
            className="border p-2 flex-grow"
          />
          <input
            type="number"
            placeholder="Peer Port"
            value={peerPort}
            onChange={(e) => setPeerPort(e.target.value)}
            className="border p-2 flex-grow"
          />
          <button
            onClick={connectToPeer}
            className="bg-green-500 text-white p-2 rounded"
          >
            Connect
          </button>
        </div>
        {isConnected && (
          <p className="text-green-600">
            Connected to {peerAddress}:{peerPort}
          </p>
        )}
      </div>

      {/* Send Message Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Send Message</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 flex-grow"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-500 text-white p-2 rounded"
            disabled={!isConnected}
          >
            Send
          </button>
        </div>
      </div>

      {/* File Transfer Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Send File</h2>
        <input
          type="file"
          onChange={sendFile}
          className="border p-2"
          disabled={!isConnected}
        />
      </div>

      {/* Logs Section */}
      <div className="bg-gray-100 p-4 h-64 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">Logs</h2>
        {logs.map((log, index) => (
          <div key={index} className="text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TCPPeerClient;
