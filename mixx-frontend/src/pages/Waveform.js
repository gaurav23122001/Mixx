import React, { useEffect, useRef, useState } from "react";
import "./Waveform.css";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsFillStopCircleFill } from "react-icons/bs";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline/index.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "rgba(7, 68, 198,0.3)",
  progressColor: "#0744C6",
  cursorColor: "#FFFFFF",
  cursorWidth: 3,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 100,
  normalize: true,
  partialRender: true,
  plugins: [
    TimelinePlugin.create({
      // plugin options ...
      container: "#waveform-timeline",
      // primaryColor: "blue",
      // secondaryColor: "red",
      // primaryFontColor: "blue",
      // secondaryFontColor: "red",
      // secondaryColor: "yellow",
      // timeInterval: 0,
      primaryLabelInterval: 1,
      // secondaryLabelInterval: 1,
    }),
  ],
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        // wavesurfer.current.Timeline();
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const handleStop = () => {
    setPlay(false);
    wavesurfer.current.stop();
  };

  // const onVolumeChange = (e) => {
  //   const { target } = e;
  //   const newVolume = +target.value;

  //   if (newVolume) {
  //     setVolume(newVolume);
  //     wavesurfer.current.setVolume(newVolume || 1);
  //   }
  // };

  return (
    <div>
      <div id="waveform" style={{ width: "85vw" }} ref={waveformRef} />
      <div id="waveform-timeline"></div>
      <div className="controls">
        <div onClick={handlePlayPause}>
          {playing ? <FaPlay size="1.5em" /> : <FaPause size="1.5em" />}
        </div>
        <div onClick={handleStop} style={{ marginLeft: "10px" }}>
          <BsFillStopCircleFill size="1.5em" />
        </div>
        {/* <label htmlFor="volume">Volume</label> */}
      </div>
    </div>
  );
}
