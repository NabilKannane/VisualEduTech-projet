import React, { useState, useEffect } from "react";
import MyChart from "../components/charts/MyChart";
import MyDonut from "../components/charts/MyDonut";
import Carousel from "../components/Carousel";
import { MoonLoader } from "react-spinners";
// import axios from 'axios'

export default function Results() {
  const [videoData, setVideoData] = useState(null);
  const [statistic, setstatistic] = useState({
    happy: 0,
    neutral: 0,
    sad: 0,
    cry: 0,
  });
  const [max_freq, setMax_freq] = useState("unknown");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/getvideodata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data['emotion_frequency']);
        setstatistic(data["emotion_frequency"]);
        // console.log(data['most_frequent_emotion'])
        setMax_freq(data["most_frequent_emotion"]);
        setVideoData(data["images"]);
        // console.log(data['images']);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {videoData ? (
        <div className="mt-4">
          <div className="ml-8 text-gray-600 text-sm">Results</div>
          <div className="flex w-full">
            <div className="bg-white text-center text-gray-700 p-4 m-6 rounded-xl shadow-2xl w-3/5">
              <MyChart data={statistic} data2={max_freq} />
            </div>
            <div className="bg-white text-center text-gray-700 p-4 m-6 rounded-xl shadow-2xl w-2/5">
              <h3 className="text-left p-2">Insights</h3>
              <MyDonut data={statistic} />
            </div>
          </div>

          <div className="bg-white text-center text-gray-700 p-4 m-6 rounded-xl shadow-2xl ">
            Images processing
            <div className="p-4 m-4">
                <Carousel data={videoData}/>
              <br/>
                <Carousel data={videoData} folder={"egalisation_histo"} />
              </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-3/4">
          <MoonLoader color="rgba(43, 88, 209, 1)" />
        </div>
      )}
    </>
  );
}
