import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { RiHomeSmileLine } from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import PeersList from "../Components/peersList";
import cloudpic from "../assets/Icons/cloud.png";
import filepic from "../assets/Icons/files.png";
import ConnectedPeers from "../Components/ConnectedPeers";
import FileDisplay from "../Components/FileDisplay";
const HomePage = ({
  peersList,
  setPeersList,
  imagePaths,
  refresh,
  chat,
  setChat,
  port,
  tcpListen,
  startTCPListener,
  stopTCPListener,
}) => {
  const [phase, setPhase] = useState(1);
  return (
    <div className="HPContainer">
      <div className="HPBar">
        <div
          className="SUlogoRow"
          onClick={() => setPhase((old) => 1)}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="Logo" />
        </div>

        <div className="HPBarTabs">
          <div
            className={phase === 1 ? "HPb selected" : "HPb"}
            onClick={() => setPhase((old) => 1)}
          >
            <span>
              <RiHomeSmileLine />
            </span>
            <span>Home</span>
          </div>
          <div
            className={phase === 2 ? "HPb selected" : "HPb"}
            onClick={() => setPhase((old) => 2)}
          >
            <span>
              <MdOutlineFileDownload />
            </span>
            <span>Files Manager</span>
          </div>
          <div
            className={phase === 3 ? "HPb selected" : "HPb"}
            onClick={() => setPhase((old) => 3)}
          >
            <span>
              <LuHistory />
            </span>
            <span>Files History</span>
          </div>
        </div>
      </div>
      <div className="HPHome">
        {phase === 1 && (
          <>
            <div className="HomeMainPage">
              <h3 style={{ width: "100%" }}>Quick Links : </h3>
              <div className="HomeMainPageRow">
                <div
                  className="HomeMainPageClick"
                  onClick={() => setPhase((old) => 2)}
                >
                  <img src={cloudpic} alt="" />
                  <span>Files Manager</span>
                </div>
                <div
                  className="HomeMainPageClick"
                  onClick={() => setPhase((old) => 3)}
                >
                  <img src={filepic} alt="" />
                  <span>Files History</span>
                </div>
              </div>
              <h3 style={{ width: "100%" }}>Connceted Peers : </h3>
              <div className="HomeMainConnectedPeers">
                {peersList.length > 1 ? (
                  <>
                    {peersList.filter((peer) => !peer.owner && peer.connected)
                      .length === 0 ? (
                      <h3>No Connected Peers</h3>
                    ) : (
                      <>
                        {peersList
                          .filter((peer) => !peer.owner && peer.connected)
                          .map((peer) => {
                            return (
                              <>
                                <ConnectedPeers
                                  peer={peer}
                                  imagePaths={imagePaths}
                                  setChat={setChat}
                                />
                              </>
                            );
                          })}
                      </>
                    )}
                  </>
                ) : (
                  <h3>No Connected Peers</h3>
                )}
              </div>
            </div>
          </>
        )}
        {phase === 2 && <>Manager</>}
        {phase === 3 && (
          <>
            <FileDisplay />
          </>
        )}
      </div>
      <div className="HPRight">
        <h4>Peers List</h4>
        <>
          <PeersList
            refresh={refresh}
            peersList={peersList}
            setPeersList={setPeersList}
            imagePaths={imagePaths}
            port={port}
            tcpListen={tcpListen}
            startTCPListener={startTCPListener}
            stopTCPListener={stopTCPListener}
          />
        </>
      </div>
    </div>
  );
};

export default HomePage;
