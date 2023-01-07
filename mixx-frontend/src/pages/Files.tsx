import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import "./Files.css";
import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonPage, IonRow, IonSearchbar, IonSpinner } from "@ionic/react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { FileData } from "../Models/File";

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
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    document.title = "Files - Mixx"
    getData()
  }, [])

  const deleteFile = async (id: string) => {
    await axios
      .post("http://localhost:5000/project/delete", {
        projectId: id,
        userId: loginMetadata.id
      })
      .then((res: any) => {
        getData();
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        // alert(err.response.data.error);
      });
  }

  const getData = async () => {
    isLoading(true);
    await axios
      .post("http://localhost:5000/project/getAllProjects", {
        userId: loginMetadata.id,
      })
      .then((res: any) => {
        setFiles(res.data)
        isLoading(false)
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        // alert(err.response.data.error);
      });
  }
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
                {loading ? <IonSpinner name="crescent" class="spinLoad" /> : null}
                {files.map((file: FileData) => {
                  return (
                    <IonRow class="fileValue">

                      <IonCol size="6" class="ion-text-start">
                        &nbsp;&nbsp;&nbsp;{file.name}
                      </IonCol>
                      <IonCol size="2" class="ion-text-center">
                        {file.audioFormat}
                      </IonCol>
                      <IonCol size="2">
                        {file.timeDiffDays == 0 ? "Today" : file.timeDiffDays == 1 ? "Yesterday" : file.timeDiffDays + " days ago"}
                      </IonCol>
                      <IonCol size="2">
                        <IonRow>
                          <IonCol>
                            <AiOutlineCloudDownload size={20} />
                          </IonCol>
                          <IonCol>
                            <MdDeleteOutline size={20} onClick={() => {
                              deleteFile(file._id)
                            }} />
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  )
                })}

              </IonGrid>
            </IonCardContent>
          </IonCard>


        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Files;
