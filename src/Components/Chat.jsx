import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
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
const Chat = ({ setChat, chatPeer, ownerww }) => {
  // const peerTest = {
  //   name: "Halim Youcef",
  //   ip: "192.168.1.3",
  //   imgIndex: "5",
  //   connected: true,
  //   owner: false,
  // };
  const [peerTest, setPeerTest] = useState({
    name: "",
    ip: "",
    imgIndex: "0",
    connected: true,
    owner: false,
  });
  useEffect(() => {
    setPeerTest((old) => chatPeer);
  }, []);
  const owner = {
    name: "Merad Mohamed Said",
    ip: "192.168.1.6",
    imgIndex: "3",
    connected: true,
    owner: true,
  };

  const [chathis, setChatHis] = useState([
    { sender: 1, message: "Hello You", timestamp: "1734034283" },
    { sender: 1, message: "Wsup", timestamp: "1734034299" },
    { sender: 1, message: "Wsup", timestamp: "1734034299" },
    { sender: 2, message: "Hey i miss you", timestamp: "1734034329" },
  ]);
  const [chatRender, setChatRender] = useState();
  // const chatrenderfun = () => {
  //   return (
  //     <>
  //       {chathis.map((chat, index) => {
  //         return (
  //           <>
  //             <div className="chatRow">
  //               <div className="chatav">
  //                 <img
  //                   src={
  //                     chat.sender === 1
  //                       ? imagePaths[owner.imgIndex]
  //                       : imagePaths[peerTest.imgIndex]
  //                   }
  //                   style={{
  //                     borderColor:
  //                       chat.sender === 1 ? "var(--accent)" : "var(--active)",
  //                   }}
  //                   alt=""
  //                 />
  //               </div>
  //               <div className="chatmsgrow">
  //                 <div className="chatinfo">
  //                   <span>{chat.sender === 1 ? owner.name : peerTest.name}</span>
  //                   <span>-</span>
  //                   <span>{chat.timestamp}</span>
  //                 </div>
  //                 <div className="chattext">
  //                   <span>{chat.message}</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </>
  //         );
  //       })}
  //     </>
  //   );
  // };

  const sendNewChat = () => {};
  const chatrenderfun = () => {
    const groupedChats = [];

    chathis.forEach((chat) => {
      const currentTimestamp = Number(chat.timestamp);
      if (
        groupedChats.length > 0 &&
        groupedChats[groupedChats.length - 1].sender === chat.sender &&
        currentTimestamp -
          Number(groupedChats[groupedChats.length - 1].lastTimestamp) <=
          60
      ) {
        groupedChats[groupedChats.length - 1].messages.push(chat.message);
        groupedChats[groupedChats.length - 1].lastTimestamp = currentTimestamp;
      } else {
        groupedChats.push({
          sender: chat.sender,
          messages: [chat.message],
          timestamp: chat.timestamp,
          lastTimestamp: currentTimestamp,
        });
      }
    });

    return (
      <>
        {groupedChats.map((chatGroup, index) => (
          <div key={index} className="chatRow">
            <div className="chatav">
              <img
                src={
                  chatGroup.sender === 1
                    ? imagePaths[owner.imgIndex]
                    : imagePaths[peerTest.imgIndex]
                }
                style={{
                  borderColor:
                    chatGroup.sender === 1 ? "var(--accent)" : "var(--active)",
                }}
                alt=""
              />
            </div>
            <div className="chatmsgrow">
              <div className="chatinfo">
                <span>
                  {chatGroup.sender === 1 ? owner.name : peerTest.name}
                </span>
                <span>-</span>
                <span>{chatGroup.timestamp}</span>
              </div>
              <div className="chattext">
                {chatGroup.messages.map((message, msgIndex) => (
                  <span key={msgIndex}>{message}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="chatdiv">
      <div className="chatBody">
        <div className="close" onClick={() => setChat(null)}>
          X
        </div>
        <div className="chatHis">
          {/* <div className="chatRow">
            <div className="chatav">
              <img src={imagePaths[owner.imgIndex]} alt="" />
            </div>
            <div className="chatmsgrow">
              <div className="chatinfo">
                <span>{owner.name}</span>
                <span>-</span>
                <span>1734034283</span>
              </div>
              <div className="chattext">
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
                <span>Hello You</span>
              </div>
            </div>
          </div> */}
          {chatrenderfun()}
        </div>
        <div className="chatCtrl">
          <div className="chatmsg">
            <input type="text" placeholder="Write your message..." />
          </div>
          <button className="chatsend">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
