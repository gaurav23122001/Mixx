import { Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router";

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
import { IonButton, IonGrid, IonIcon, IonInput, IonPopover, IonRow } from "@ionic/react";
import "./URL.css"

interface URLProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata;
    setShowPopover: (value: boolean) => void;
    showPopover: boolean;
}
const URL: React.FC<URLProps> = ({ loginMetadata, loginfunction, setShowPopover, showPopover }) => {

    return (
        <IonPopover
            isOpen={showPopover}
            onDidDismiss={() => {
                setShowPopover(false);
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
                                setShowPopover(false);
                            }}
                            className="urlClose"
                        ></IonIcon>
                    </IonRow>
                    <IonRow class="urlText">
                        Add Files by URL
                    </IonRow>
                    <IonRow class="urlInputWrapper">
                        <IonInput
                            required={true}
                            placeholder="Enter URL"
                        >

                        </IonInput>
                    </IonRow>
                    <IonRow>
                        <IonButton
                            class="urlSubmit"
                            type="submit"

                        >
                            Submit
                        </IonButton>
                    </IonRow>
                </IonGrid>
            </form>
        </IonPopover>
    );
};

export default URL;
