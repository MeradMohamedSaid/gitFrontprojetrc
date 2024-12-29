import React, { useEffect, useState, useRef } from "react";

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
const Chat = ({
  setChat,
  chatPeer,
  ownerww,
  chatList,
  setChatList,
  sendSocketMsg,
}) => {
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

  const sendNewChat = async () => {
    //"msg"+":"+"time"+":"+"sender"+":"+"receiver"+":"+"type"
    var ncv =
      inputValue +
      ":" +
      Date.now() +
      ":" +
      ownerww.ip +
      ":" +
      chatPeer.ip +
      ":" +
      2;
    console.log(ncv);
    var prefChat = chatList;
    prefChat.push({
      sender: 1,
      message: inputValue,
      timestamp: Date.now(),
      from: ownerww.ip,
      to: chatPeer.ip,
    });
    await sendSocketMsg(ncv);
    setChatList((oldchat) => prefChat);
    setInputValue((old) => "");
  };

  const chatrenderfun = () => {
    const groupedChats = [];

    chatList.forEach((chat) => {
      if (
        (chat.sender === 2 && chat.from === chatPeer.ip) ||
        (chat.sender === 1 && chat.to === chatPeer.ip)
      ) {
        const currentTimestamp = chat.timestamp;
        if (
          groupedChats.length > 0 &&
          groupedChats[groupedChats.length - 1].sender === chat.sender &&
          currentTimestamp -
            groupedChats[groupedChats.length - 1].lastTimestamp <=
            60000
        ) {
          groupedChats[groupedChats.length - 1].messages.push(chat.message);
          groupedChats[groupedChats.length - 1].lastTimestamp =
            currentTimestamp;
        } else {
          groupedChats.push({
            sender: chat.sender,
            messages: [chat.message],
            timestamp: chat.timestamp,
            lastTimestamp: currentTimestamp,
          });
        }
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
                    ? imagePaths[ownerww.imgIndex]
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
                <span>{chatGroup.sender === 1 ? "You" : peerTest.name}</span>
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

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const chatListtoryRef = useRef(null);
  const scrollToBottom = () => {
    if (chatListtoryRef.current) {
      chatListtoryRef.current.scrollTop = chatListtoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatrenderfun()]);
  return (
    <div className="chatdiv">
      <div className="chatBody">
        <div className="close" onClick={() => setChat(null)}>
          X
        </div>
        <div className="chatHis" ref={chatListtoryRef}>
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
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Write your message..."
            />
          </div>
          <button className="chatsend" onClick={() => sendNewChat()}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
