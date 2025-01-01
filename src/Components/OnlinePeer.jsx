import React, { useEffect, useState } from "react";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { IoPlay, IoPause } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { PiListStarFill } from "react-icons/pi";

const OnlinePeer = ({
  peer,
  imagePaths,
  port,
  tcpListen,
  startTCPListener,
  stopTCPListener,
  requestsSent,
  requestsReceived,
  connectToPeer,
}) => {
  const [peerPort, setPeerPort] = useState("-1");
  const [peerPortInput, setPeerPortInput] = useState();
  const [peerPortDiv, setPeerPortDiv] = useState(false);
  const openPortDiv = () => {
    setPeerPortDiv((old) => true);
  };
  const savePort = () => {
    setPeerPort((old) => peerPortInput);
    setPeerPortDiv((old) => false);
  };
  const handleInputChange = (e) => {
    setPeerPortInput(e.target.value);
  };

  const sendConnection = async () => {
    console.log("peeradress", peer.ip);
    console.log("peerPort", peerPort);
    await connectToPeer(peer.ip, peerPort);
  };
  return (
    <div className="PRLpeer">
      {peerPortDiv && (
        <div className="portDiv">
          <div className="portDivInput">
            <span>Enter {peer.name}'s port :</span>
            <input
              type="text"
              placeholder={`peer port (address: ${peer.ip})`}
              value={peerPortInput} // Controlled value
              onChange={handleInputChange} // Updates state on input change
            />
            <button onClick={() => savePort()}>save</button>
            <button onClick={() => setPeerPortDiv((old) => false)}>
              cancel
            </button>
          </div>
        </div>
      )}
      <div className="PRLPeerImg">
        <img
          src={imagePaths[peer.imgIndex]}
          style={{
            borderColor: `${peer.connected ? "var(--active)" : "var(--away)"}`,
          }}
        />
        <div
          className="PRLBALL"
          style={{
            background: `${peer.connected ? "var(--active)" : "var(--away)"}`,
          }}
        />
      </div>
      <div className="PRLInfo">
        <div>
          {peer.name + " "}
          {requestsReceived.includes(peer.ip) && !peer.owner && (
            <>
              (
              <span style={{ color: "var(--away)" }}>
                <PiListStarFill />
              </span>
              )
            </>
          )}
          {peer.owner && (
            <>
              (<span style={{ fontWeight: "lighter" }}>You</span>)
            </>
          )}
        </div>
        <div className="PRUNDERdiv">
          <span>
            {peer.ip}
            {peer.owner && tcpListen && <span>:{port}</span>}
            {!["-1", ""].includes(peerPort) && <span>:{peerPort}</span>}
          </span>
          <div className="PeerInfoButtons">
            {peer.owner && (
              <>
                {!tcpListen ? (
                  <button
                    style={{ background: "var(--active)" }}
                    onClick={() => startTCPListener()}
                  >
                    Start Listening
                  </button>
                ) : (
                  <button
                    style={{ background: "var(--inActive)" }}
                    onClick={() => stopTCPListener()}
                  >
                    Stop <IoPause />
                  </button>
                )}
              </>
            )}
          </div>
          {!peer.owner && (
            <div className="PeerInfoButtons">
              {!peer.connected && !requestsSent.includes(peer.ip) ? (
                <>
                  <button onClick={() => openPortDiv()}>Port</button>
                  {!["-1", ""].includes(peerPort) && (
                    <button
                      onClick={() => {
                        sendConnection();
                      }}
                      style={{ background: "var(--active)" }}
                    >
                      <PiPlugsConnectedFill />
                    </button>
                  )}
                </>
              ) : (
                <span>waiting</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlinePeer;
