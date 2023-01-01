import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import axios from 'axios';
import secrets from '../secrets';

import "./Home.css";
import {
    AiFillFileAdd,
    AiOutlineSync,
    AiOutlineCloudUpload,
    AiOutlineLink,
} from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";

interface HomeProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata;
}


const Home: React.FC<HomeProps> = ({ loginfunction, loginMetadata }) => {
    useEffect(() => {
        document.title = "Home - Mixx"
    })
    const [dropDownFile, setDropDownFile] = useState(false);
    const [dropDownAudio, setDropDownAudio] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("mp3");
    const [showPopover, setShowPopover] = useState(false);
    const [selectedFileUpload, setSelectedFileUpload] = useState<any>({});
    const supportedAudio = ["wav", "aac", "ogg", "mp3"];


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

    const handleFileUpload = (value: any) => {
        setSelectedFileUpload(value[0]);
        setDropDownFile(false);
    };

    const uploadFileToServer = () => {
        const formData = new FormData();

        formData.append("video", selectedFileUpload);
        formData.append("audioFormat", selectedFormat);

        axios.post(`${secrets.API_BASE_URL}/upload-file`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        setSelectedFileUpload({});
    }

    return (
        <div className="container1">
            <Menu loginMetadata={loginMetadata} loginfunction={loginfunction} />
            <form className="main" onSubmit={(e) => {
                e.preventDefault();
            }}>
                {!dropDownFile ? (
                    <div className="select">
                        <div>
                            <AiFillFileAdd size="1.3em" />
                        </div>
                        <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                            <input
                                type="file"
                                name="video"
                                accept="video/*"
                                id="video-upload"
                                style={{ display: "none" }}
                                onChange={e => {
                                    handleFileUpload(e.target.files)
                                }}
                                required
                            />
                            Select Files</label>
                        <div onMouseMove={() => { setDropDownFile(true) }} >
                            <MdOutlineKeyboardArrowDown size="1.3em" />
                        </div>
                    </div>
                ) : (
                    <div className="dropdown" onMouseLeave={() => { setDropDownFile(false) }}>
                        <div className="dropdown-top">
                            <div>
                                <AiFillFileAdd size="1.3em" />
                            </div>
                            <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                                <input type="file" accept="video/*" id="video-upload" style={{ display: "none" }} />
                                Select Files</label>
                            <div>
                                <MdKeyboardArrowUp size="1.3em" />
                            </div>
                        </div>
                        <label
                            htmlFor="video-upload"
                            className="dropdown-list"
                        >
                            <div className="dropdown-icon">
                                <AiOutlineCloudUpload size="1.3em" />
                            </div>
                            <div style={{ cursor: "pointer" }}>
                                <input type="file" accept="video/*" id="video-upload" style={{ display: "none" }} />
                                From Device</div>
                        </label>
                        <div
                            className="dropdown-list"
                            onClick={() => {
                                setShowPopover(true);
                            }}
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
                        <div onMouseMove={handleDropdownAudio} >
                            <MdOutlineKeyboardArrowDown size="1.3em" />
                        </div>
                    </div>
                ) : (
                    <div className="dropdown" onMouseLeave={() => {
                        setDropDownAudio(false)
                    }}>
                        <div className="dropdown-top">
                            <div>
                                <FaMusic size="1.3em" />
                            </div>
                            <div>{selectedFormat}</div>
                            <div >
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
                <label className="select convert" htmlFor="video-convert">
                    <input onClick={uploadFileToServer} type="submit" id="video-convert" style={{ display: "none" }} />
                    <div>Convert</div>
                    <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                        <AiOutlineSync size="1.3em" />
                    </div>
                </label>
            </form>
        </div>
    );
};

export default Home;
