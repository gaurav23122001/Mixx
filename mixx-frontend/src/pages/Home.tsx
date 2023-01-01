import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import "./Home.css";
import {
  AiFillFileAdd,
  AiOutlineSync,
  AiOutlineCloudUpload,
  AiOutlineLink,
} from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { SetStateAction, useState } from "react";

interface HomeProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}

const Home: React.FC<HomeProps> = ({ loginfunction, loginMetadata }) => {
  const [dropDownFile, setDropDownFile] = useState(false);
  const [dropDownAudio, setDropDownAudio] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("Mp3");
  const [selectedFileUpload, setSelectedFileUpload] = useState("Select Files");
  const supportedAudio = ["WAV", "AAC", "OGG", "Mp3"];

  const handleDropdownFile = () => {
    setDropDownFile(!dropDownFile);
  };
  const handleDropdownAudio = () => {
    setDropDownAudio(!dropDownAudio);
  };
  const handleAudioSelect = (audio: SetStateAction<string>) => {
    setSelectedFormat(audio);
    setDropDownAudio(false);
  };
  const handleFileUpload = (value: SetStateAction<string>) => {
    setSelectedFileUpload(value);
    setDropDownFile(false);
  };

  return (
    <div className="container1">
      <Menu loginMetadata={loginMetadata} loginfunction={loginfunction} />
      <div className="main">
        {!dropDownFile ? (
          <div className="select">
            <div>
              <AiFillFileAdd size="1.3em" />
            </div>
            <div>{selectedFileUpload}</div>
            <div onClick={handleDropdownFile}>
              <MdOutlineKeyboardArrowDown size="1.3em" />
            </div>
          </div>
        ) : (
          <div className="dropdown">
            <div className="dropdown-top">
              <div>
                <AiFillFileAdd size="1.3em" />
              </div>
              <div>{selectedFileUpload}</div>
              <div onClick={handleDropdownFile}>
                <MdKeyboardArrowUp size="1.3em" />
              </div>
            </div>
            <div
              className="dropdown-list"
              onClick={() => handleFileUpload("From Device")}
            >
              <div className="dropdown-icon">
                <AiOutlineCloudUpload size="1.3em" />
              </div>
              <div>From Device</div>
            </div>
            <div
              className="dropdown-list"
              onClick={() => handleFileUpload("From URL")}
            >
              <div className="dropdown-icon">
                <AiOutlineLink size="1.3em" />
              </div>
              <div>From URL</div>
            </div>
          </div>
        )}
        {!dropDownAudio ? (
          <div className="select">
            <div>
              <FaMusic size="1.3em" />
            </div>
            <div>{selectedFormat}</div>
            <div onClick={handleDropdownAudio}>
              <MdOutlineKeyboardArrowDown size="1.3em" />
            </div>
          </div>
        ) : (
          <div className="dropdown">
            <div className="dropdown-top">
              <div>
                <FaMusic size="1.3em" />
              </div>
              <div>{selectedFormat}</div>
              <div onClick={handleDropdownAudio}>
                <MdKeyboardArrowUp size="1.3em" />
              </div>
            </div>
            {supportedAudio
              .filter((audio) => audio !== selectedFormat)
              .map((audio) => {
                return (
                  <div
                    onClick={() => handleAudioSelect(audio)}
                    className="dropdown-list dropdown-list-audio"
                    id={audio}
                  >
                    {audio}
                  </div>
                );
              })}
          </div>
        )}
        <div className="select convert">
          <div>Convert</div>
          <div style={{ marginTop: "5px", marginLeft: "10px" }}>
            <AiOutlineSync size="1.3em" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
