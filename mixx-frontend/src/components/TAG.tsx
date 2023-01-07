import { Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import { BsTagFill } from "react-icons/bs";
import { MdAddComment, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillClockCircle, AiFillPlusCircle } from "react-icons/ai";
import "./Menu.css";
import { GoogleLogout } from "react-google-login";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import { AiFillHome, AiFillContacts, AiOutlineLogout } from "react-icons/ai";
import { SiFiles } from "react-icons/si";
import { useState } from "react";
import {
  MdFactCheck,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Login from "../pages/Login";
import { close } from "ionicons/icons";
import {
  IonButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonPopover,
  IonRow,
} from "@ionic/react";
import "./URL.css";

interface TAGProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  setTagPopOver: (value: boolean) => void;
  tagPopOver: boolean;
}
const URL: React.FC<TAGProps> = ({
  loginMetadata,
  loginfunction,
  setTagPopOver,
  tagPopOver,
}) => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  return (
    <IonPopover
      isOpen={tagPopOver}
      onDidDismiss={() => {
        setTagPopOver(false);
      }}
      class="urlPopover"
    >
      <form>
        <IonGrid class="urlGrid">
          <IonRow class="urlCloseWrapper">
            <IonIcon
              md={close}
              class="iconSize"
              size="large"
              onClick={() => {
                setTagPopOver(false);
              }}
              className="urlClose"
            ></IonIcon>
          </IonRow>
          <IonRow class="urlText">Add tag</IonRow>
          <IonRow class="urlInputWrapper">
            <IonInput
              required={true}
              placeholder="Enter tag"
              class="urlInput"
              value={videoUrl}
              onIonChange={(e) => {
                setVideoUrl(e.detail.value!);
              }}
            ></IonInput>
          </IonRow>
          <div className="badges">
            <div className="badge">
              <div>
                <AiFillClockCircle />
              </div>
              <div>From</div>
              <div>
                <MdKeyboardArrowDown />
              </div>
            </div>
            <div className="badge">
              <div>
                <AiFillClockCircle />
              </div>
              <div>To</div>
              <div>
                <MdKeyboardArrowDown />
              </div>
            </div>
          </div>
          <IonRow>
            <IonButton
              class="urlSubmit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (videoUrl !== "") {
                  loginfunction(new LoginMetadata(videoUrl));
                  setTagPopOver(false);
                }
              }}
            >
              Add tag
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
    </IonPopover>
  );
};

export default URL;
