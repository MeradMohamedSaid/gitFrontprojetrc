import React, { useEffect, useState } from "react";
import axios from "axios";
import TCPListener from "./TCPListener";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import Chat from "./Components/Chat";
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
import TCPPeerClient from "./TCPpeer";
const App = () => {
  const [message, setMessage] = useState("Discover Peers");
  const [response, setResponse] = useState([]);
  const [ip, setIp] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState("");
  const [avIndex, setAvIndex] = useState(0);
  const [chat, setChat] = useState(false);

  /*************************TCP LISTENER*****************************/

  const [port, setPort] = useState();
  const [tcpListen, setTcpListen] = useState(false);
  const [tcpMessages, setTcpMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const webSocket = new WebSocket("ws://localhost:8080/tcp-listener");

  //   webSocket.onopen = () => {
  //     console.log("WebSocket connected");
  //     setSocket(webSocket);
  //   };

  //   webSocket.onmessage = (event) => {
  //     setTcpMessages((prev) => [...prev, event.data]);
  //     console.log(event.data);
  //   };

  //   webSocket.onclose = () => {
  //     console.log("WebSocket disconnected");
  //     setSocket(null);
  //   };

  //   return () => {
  //     if (webSocket.readyState === WebSocket.OPEN) {
  //       webSocket.close();
  //       setTcpListen((old) => false);
  //     }
  //   };
  // }, []);

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

  const stopTCPListener = async () => {
    console.log("Stop Tcp Listener");

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("exit");
      socket.close();
      setTcpListen((old) => false);
      setSocket(null); // Clear the socket reference
    } else {
      console.log("WebSocket is not open. Cannot stop TCP listener.");
    }
  };
  const startTCPListener = async () => {
    console.log("Start Tcp Listener");
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("close:current-listener");
      socket.close();
      setTcpListen((old) => false);
    }

    const rport = await getAvailablePort();
    setPort((old) => rport);
    console.log("New WebSocket Creation");
    const newSocket = new WebSocket("ws://localhost:8080/tcp-listener");
    newSocket.onopen = () => {
      console.log("New WebSocket connected");
      setTimeout(async () => {
        setTcpListen((old) => true);
        await setSocket((old) => newSocket);
      }, 1000);
      newSocket.send(`start-listener:${rport}`);
    };

    newSocket.onmessage = (event) => {
      setTcpMessages((prev) => [...prev, event.data]);
      console.log(event.data);
    };

    newSocket.onclose = () => {
      console.log("New WebSocket disconnected");
      setTcpListen((old) => false);
    };
  };

  /*******************Peers Management*************************/
  const [discoveredPeers, setDiscoveredPeers] = useState([]);
  const [peersList, setPeersList] = useState([
    {
      name: "Zaghez Belkacem",
      ip: "192.168.1.6",
      imgIndex: "3",
      connected: true,
      owner: false,
    },
    {
      name: "Halim Youcef",
      ip: "192.168.1.3",
      imgIndex: "5",
      connected: false,
      owner: false,
    },
  ]);

  const [chatPeer, setChatPeer] = useState();
  const StartChat = (peer) => {
    console.log("Start Chat with peer : ", peer);
    setChatPeer((oldi) => peer);
    if (chat === true) {
      setChat((old) => false);
    } else {
      setChat((old) => true);
    }
  };
  useEffect(() => {
    setPeersList((prevList) =>
      prevList.length > 0
        ? [...prevList.filter((peer) => peer.owner), ...discoveredPeers]
        : [
            {
              name: name,
              ip: ip,
              imgIndex: avIndex,
              connected: true,
              owner: true,
            },
            ...discoveredPeers,
          ]
    );
  }, [discoveredPeers]);

  /***********************************************************/

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
      await setIsLoading((old) => false);
    }
    start();
  }, []);

  const sendDataToBackend = async () => {
    const data = { avIndex, name };

    try {
      const response = await fetch("http://localhost:8080/api/storeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data stored successfully:", result);
      } else {
        console.error("Failed to store data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startNow = async (name, imgId) => {
    await sendDataToBackend(name, imgId);
    setPeersList((old) => ({
      name: name,
      ip: ip,
      imgIndex: avIndex,
      connected: true,
      owner: true,
    }));
    setTimeout(async () => {
      await DiscoverPeers();
    }, 500);

    setPhase((old) => 2);
  };

  const DiscoverPeers = async () => {
    try {
      setMessage((old) => "Loading");
      const res = await axios.get("http://localhost:8080/api/discoverPeers");

      setResponse((old) => res.data);
      var arraofPeers = [
        {
          name: "Halim Youcef",
          ip: "192.168.1.3",
          imgIndex: "5",
          connected: false,
          owner: false,
        },
      ];
      response.forEach((peer) => {
        var peero = {
          name: peer.name,
          ip: peer.address,
          imgIndex: peer.imgIndex > 7 ? 7 : peer.imgIndex,
          connected: false,
          owner: false,
        };
        arraofPeers.push(peero);
      });
      console.log("array of peers : ", arraofPeers);

      setDiscoveredPeers((prevPeers) => {
        const updatedPeers = [...prevPeers];
        arraofPeers.forEach((peer) => {
          const existingPeerIndex = updatedPeers.findIndex(
            (discoveredPeer) => discoveredPeer.ip === peer.ip
          );

          if (existingPeerIndex !== -1) {
            updatedPeers[existingPeerIndex] = {
              ...updatedPeers[existingPeerIndex],
              ...peer,
            };
          } else {
            updatedPeers.push(peer);
          }
        });

        return updatedPeers;
      });
      console.log("Final Array : ", discoveredPeers);
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
            {
              <SignUpPage
                startNow={startNow}
                imagePaths={imagePaths}
                ip={ip}
                setName={setName}
                name={name}
                avIndex={avIndex}
                setAvIndex={setAvIndex}
              />
            }
          </>
        )}
        {phase === 2 && (
          <>
            <HomePage
              peersList={peersList}
              setPeersList={setPeersList}
              imagePaths={imagePaths}
              refresh={DiscoverPeers}
              chat={chat}
              setChat={StartChat}
              port={port}
              tcpListen={tcpListen}
              startTCPListener={startTCPListener}
              stopTCPListener={stopTCPListener}
            />
          </>
        )}
        {chat && <Chat setChat={StartChat} chatPeer={chatPeer} />}
        {/* <TCPPeerClient /> */}
      </div>
    </>
  );
};

export default App;
