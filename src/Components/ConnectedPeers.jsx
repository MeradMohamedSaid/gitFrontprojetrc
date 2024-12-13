import React, { useEffect } from "react";
import { RiFileUploadFill } from "react-icons/ri";

import { IoIosSend } from "react-icons/io";

const ConnectedPeers = ({ peer, imagePaths, setChat }) => {
  return (
    <div className="CPDiv">
      <div className="CPInfoBox">
        <img src={imagePaths[peer.imgIndex]} alt="" />
        <div className="CPInfo">
          <span>{peer.name}</span>
          <span>{peer.ip}</span>
        </div>
      </div>
      <div className="CPButtons">
        <button>
          <span>Share File</span>

          <RiFileUploadFill />
        </button>
        <button onClick={() => setChat(peer)}>
          <span>Chat With Peer</span>

          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ConnectedPeers;
