import React, { useEffect } from "react";

const OnlinePeer = ({
  peer,
  imagePaths,
  port,
  tcpListen,
  startTCPListener,
  stopTCPListener,
}) => {
  return (
    <div className="PRLpeer">
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
        <p>
          {peer.name + " "}
          {peer.owner && (
            <>
              (<span style={{ fontWeight: "lighter" }}>You</span>)
            </>
          )}
        </p>
        <p>
          <span>
            {peer.ip}
            {peer.owner && tcpListen && <span>:{port}</span>}
          </span>

          {peer.owner && (
            <>
              {!tcpListen ? (
                <button
                  style={{ background: "var(--active)" }}
                  onClick={() => startTCPListener()}
                >
                  start listening
                </button>
              ) : (
                <button
                  style={{ background: "var(--inActive)" }}
                  onClick={() => stopTCPListener()}
                >
                  Stop
                </button>
              )}
            </>
          )}
          {!peer.connected && <button>connect</button>}
        </p>
      </div>
    </div>
  );
};

export default OnlinePeer;
