import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.png";
import diceIcon from "../assets/Icons/diceIcon.png";
import arrowIcon from "../assets/Icons/arrowright.png";
import { TraceSpinner } from "react-spinners-kit";
//https://dmitrymorozoff.github.io/react-spinners-kit/

const SignUpPage = ({ startNow, imagePaths, ip }) => {
  // Paths to the avatar images
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState(1);
  const [avIndex, setAvIndex] = useState(0);
  useEffect(() => {
    async function load() {
      setTimeout(async () => {
        await setLoading((old) => false);
      }, 2000);
    }
    load();
  }, []);
  const avatar = imagePaths[avIndex];

  const [name, setName] = useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  const renderAvatar = () => {
    return (
      <img src={avatar} alt={`Avatar ${avIndex}`} className=" shadow-example" />
    );
  };

  const handleClick = () => {
    if (phase === 1) {
      setPhase((old) => 2);
    } else {
      startNow(avIndex, name);
    }
  };

  const randomizeName = () => {
    const fn = [
      "Flash",
      "Bolt",
      "Maverick",
      "Ranger",
      "Ghost",
      "Hunter",
      "Acey",
      "Phoenix",
      "Sky",
      "Cobra",
      "Axel",
      "Jet",
      "Colt",
      "Rocky",
      "Diesel",
      "Echo",
      "Zephyr",
      "Stormy",
      "Ryder",
      "Blitz",
      "Bandit",
      "Shadow",
      "Drake",
      "Frosty",
      "Fang",
      "Nitro",
      "Lynx",
      "Havoc",
      "Titan",
      "Inferno",
      "Nova",
      "Steel",
      "Blade",
      "Sonic",
      "Zion",
      "Chaos",
      "Vortex",
      "Onyx",
      "Lazer",
      "Bullet",
      "Flare",
      "Hydra",
      "Stryker",
      "Raptor",
      "Skye",
      "Rogue",
      "Dagger",
      "Comet",
      "Venom",
      "Archer",
      "Fury",
      "Typhoon",
      "Glitch",
      "Pulse",
      "Phantom",
      "Blaze",
      "Turbo",
      "Jaguar",
    ];
    const ln = [
      "Crimson",
      "Steel",
      "Frost",
      "Raven",
      "Blade",
      "Wolf",
      "Knight",
      "Thunder",
      "Storm",
      "Shadow",
      "Crest",
      "Glider",
      "Hunter",
      "Falcon",
      "Griffin",
      "Hawk",
      "Phoenix",
      "Echo",
      "Bolt",
      "Flame",
      "Blizzard",
      "Night",
      "Rogue",
      "Fury",
      "Comet",
      "Wraith",
      "Zephyr",
      "Rider",
      "Viper",
      "Sniper",
      "Raptor",
      "Typhoon",
      "Lion",
      "Cobra",
      "Drifter",
      "Cyclone",
      "Axe",
      "Dagger",
      "Hydra",
      "Nova",
      "Titan",
      "Inferno",
      "Specter",
      "Shark",
      "Jaguar",
      "Vortex",
      "Talon",
      "Ghost",
      "Blast",
      "Scorpion",
      "Hunter",
      "Falcon",
      "Archer",
      "Lynx",
      "Bullet",
      "Striker",
      "Glitch",
    ];
    const randomFirstNickname = fn[Math.floor(Math.random() * fn.length)];
    const randomLastNickname = ln[Math.floor(Math.random() * ln.length)];

    setName(
      (old) =>
        randomFirstNickname +
        randomLastNickname +
        Math.floor(Math.random() * 200)
    );
  };

  return (
    <div className="SignUphome">
      {loading ? (
        <>
          <div className="loader">
            <TraceSpinner size={50} frontColor="#015AFF" loading={loading} />
          </div>
        </>
      ) : (
        <>
          <div className="SUlogoRow">
            <img src={logo} alt="Logo" />
          </div>
          <div className="SUmainRow">
            {phase === 1 ? (
              <>
                <div className="SUleftph1">
                  <h2>Pick Your Avatar</h2>
                  <div className="SUcurrentLogo">{renderAvatar()}</div>
                  <div className="SUaltsImages">
                    {imagePaths ? (
                      imagePaths.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Avatar ${index + 1}`}
                          onClick={() => setAvIndex(index)} // Update avIndex here
                          className={`SUimgalt shadow-example ${
                            avIndex === index ? " selected" : ""
                          }`} // Add a 'selected' class for styling
                        />
                      ))
                    ) : (
                      <div className="loader">
                        <TraceSpinner
                          size={50}
                          frontColor="#015AFF"
                          loading={loading}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="SUsepa"></div>
                <div className="SUleftph2">
                  <h2>Give yourself a name</h2>
                  <div className="SUinput">
                    <span>Choose A fancy special name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={handleChange}
                      placeholder="Start typing..."
                    />
                  </div>
                  <div className="SUbutton" onClick={() => randomizeName()}>
                    <span>Randomize</span>
                    <span>
                      <img src={diceIcon} alt="" />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="SUPH2div">
                  <h2>Welcome to NeuraFamily, {name}!</h2>
                  <h1>Here’s Your Profile:</h1>
                  <div className="SUcurrentLogo">{renderAvatar()}</div>
                  <h1>{name}</h1>
                  <h4>{ip}</h4>
                  <h3>Dive in and explore:</h3>
                </div>
              </>
            )}
          </div>
          <div className="SUmainButtonRow">
            <div
              className={
                name.length === 0
                  ? "SUmainButton disabledButton"
                  : "SUmainButton"
              }
              onClick={name.length > 0 ? () => handleClick() : null}
            >
              {phase === 1 ? (
                <span>Continue</span>
              ) : (
                <>
                  <span>Start now</span>
                  <span>
                    <img src={arrowIcon} alt="" />
                  </span>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
