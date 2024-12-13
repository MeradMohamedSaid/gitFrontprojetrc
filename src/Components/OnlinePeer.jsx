import React, { useEffect } from "react";

const OnlinePeer = ({ peer, imagePaths }) => {
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
          <span>{peer.ip}</span>
          {!peer.connected && <button>connect</button>}
        </p>
      </div>
    </div>
  );
};

export default OnlinePeer;
