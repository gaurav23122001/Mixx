import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import "./Play.css";
import PlayList from "./PlayList";
import { useState } from "react";
import { BsTagFill } from "react-icons/bs";
import { MdAddComment, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillClockCircle, AiFillPlusCircle } from "react-icons/ai";
import { IonPage } from "@ionic/react";
import Waveform from "./Waveform";
import COMMENT from "../components/COMMENT";
import TAG from "../components/TAG";
// import Waveform from "./Waveform";

const tracks = [
  {
    id: 0,
    title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
    url: "https://www.mfiles.co.uk/mp3-downloads/massenet-thais-meditation-violin-piano.mp3",
  },
  {
    id: 1,
    title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
    url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  },
];

interface AudioProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  menu: boolean;
  sidebarOpen: boolean;
  screen: boolean;
  setMenu: (args: boolean) => void;
  setScreen: (args: boolean) => void;
  setSidebarOpen: (args: boolean) => void;
}

const Audio: React.FC<AudioProps> = ({
  loginfunction,
  loginMetadata,
  menu,
  setSidebarOpen,
  setScreen,
  setMenu,
  screen,
  sidebarOpen,
}) => {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [commentPopOver, setCommentPopOver] = useState(false);
  const [tagPopOver, setTagPopOver] = useState(false);

  return (
    <IonPage className="container1 waveform">
      <Menu
        setMenu={setMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        loginMetadata={loginMetadata}
        loginfunction={loginfunction}
      />
      <div className="waveform-container">
        <div className="main ">
          <Waveform url={selectedTrack.url} />
          {/* <PlayList
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          /> */}
        </div>
        <div className="tags">
          <div className="header">
            <div>
              <div>
                <BsTagFill size="1.3em" />
              </div>
              <div className="title">Tags</div>
              <TAG
                loginMetadata={loginMetadata}
                loginfunction={loginfunction}
                setTagPopOver={setTagPopOver}
                tagPopOver={tagPopOver}
              />
            </div>
            <div>
              <div>
                <AiFillPlusCircle
                  onClick={() => {
                    setTagPopOver(true);
                  }}
                  size="1.5rem"
                />
              </div>
            </div>
          </div>
          <div className="info"></div>
        </div>
        <div className="comments">
          <div className="header">
            <div>
              <div>
                <MdAddComment size="1.3em" />
              </div>
              <div className="title">Comments</div>
              <COMMENT
                loginMetadata={loginMetadata}
                loginfunction={loginfunction}
                setCommentPopOver={setCommentPopOver}
                commentPopOver={commentPopOver}
              />
            </div>
            <div>
              <div>
                <AiFillPlusCircle
                  onClick={() => {
                    setCommentPopOver(true);
                  }}
                  size="1.5rem"
                />
              </div>
            </div>
          </div>
          <div className="info"></div>
        </div>
      </div>
    </IonPage>
  );
};

export default Audio;
