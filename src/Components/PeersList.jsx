import React, { useEffect } from "react";
import OnlinePeer from "./onlinePeer";
import { IoMdRefresh } from "react-icons/io";

const PeersList = ({ peersList, setPeersList, imagePaths, refresh }) => {
  return (
    <div className="PLContainer">
      <div className="PLSelector"></div>
      {/* <div className="PLseparator"></div> */}
      <p className="PLTitle">
        <span>Connected with</span>
        <button
          onClick={() => {
            refresh();
          }}
        >
          <IoMdRefresh />
        </button>
      </p>
      <div className="PLPLIST">
        {peersList.length > 0 &&
          peersList.map((peer) => {
            if (peer.connected) {
              console.log(peer);
              return (
                <>
                  <OnlinePeer peer={peer} imagePaths={imagePaths} />
                </>
              );
            }
          })}
      </div>
      {peersList.length > 1 && (
        <>
          {peersList.filter((peer) => !peer.owner && !peer.connected).length >
            0 && (
            <>
              <div className="PLseparator"></div>
              <p className="PLTitle">Available</p>
              <div className="PLPLIST">
                {peersList
                  .filter((peer) => !peer.connected)
                  .map((peer) => (
                    <OnlinePeer
                      key={peer.ip || peer.name}
                      peer={peer}
                      imagePaths={imagePaths}
                    />
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PeersList;
