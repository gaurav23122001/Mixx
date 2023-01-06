import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import "./Files.css";
import { useState } from "react";
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonSearchbar } from "@ionic/react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

interface FilesProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata,
  menu: boolean,
  sidebarOpen: boolean,
  screen: boolean,
  setMenu: (args: boolean) => void,
  setScreen: (args: boolean) => void,
  setSidebarOpen: (args: boolean) => void,
}

const Files: React.FC<FilesProps> = ({ loginfunction,
  loginMetadata, menu, setSidebarOpen, setScreen, setMenu, screen, sidebarOpen }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <IonPage className="container1 filePage">
      <IonContent className="filePageContent">
        <Menu setMenu={setMenu} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loginMetadata={loginMetadata} loginfunction={loginfunction} />
        <IonRow className="searchbarBorder">
          <IonSearchbar mode="md"
            class="searchBar1"
            value={searchText}
            onIonChange={(e) => {
              setSearchText(e.detail.value ? e.detail.value : "");
            }}
          ></IonSearchbar>
        </IonRow>
        <IonRow class="searchbarBorder">
          <IonCard class="fileTop">
            <IonCardContent >
              <IonGrid>
                <IonRow style={{ fontSize: "1rem" }}>
                  <IonCol size="6" class="ion-text-center">
                    Name
                  </IonCol>
                  <IonCol size="2" class="ion-text-center">
                    Format
                  </IonCol>
                  <IonCol size="2">
                  </IonCol>
                  <IonCol size="2">
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonRow>
        <IonRow class="searchbarBorder">
          <IonCard class="fileTop fileDetails">
            <IonCardContent >
              <IonGrid style={{ color: "white", opacity: "0.5" }}>
                <IonRow class="fileValue">
                  <IonCol size="6" class="ion-text-start">
                    &nbsp;&nbsp;&nbsp;Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, esse?
                  </IonCol>
                  <IonCol size="2" class="ion-text-center">
                    mp3
                  </IonCol>
                  <IonCol size="2">
                    3 days ago
                  </IonCol>
                  <IonCol size="2">
                    <IonRow>
                      <IonCol>
                        <AiOutlineCloudDownload size={20} />
                      </IonCol>
                      <IonCol>
                        <MdDeleteOutline size={20} />
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>


        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Files;
