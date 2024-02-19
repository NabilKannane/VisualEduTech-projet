import React, { useState, useEffect } from "react";
import axios from "axios";

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(props.data || []);
  const [images, setimages] = useState([])

  useEffect(() => {
    const lists = []

    // data.map(async (item) => {
    //   let s = await axios
    //     .get(`http://localhost:5000/convertImage?name=${item}`)
    //     .then((res) => "data:image/jpeg;base64," + res.data)
    //     // console.log(s);
    //   lists.push(s)
    // });

    console.log(props.folder)
    data.map(async (item) => {
      let s = await axios
        .get(`http://localhost:5000/convertImage?name=${item}${props?.folder ? `&folder=${props.folder}`: '' }`)
        .then((res) => "data:image/jpeg;base64," + res.data)
        // console.log(s);
      lists.push(s)
    });

setimages(lists)
    
  }, [data]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const pathImages = "../../../SmartEdu/kafka_hadoop_spark_hive/src/images/";

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Map sur les données pour afficher les images */}
        {
          images.map((item, index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${
                index === activeIndex ? "block" : "hidden"
              }`}
              data-carousel-item="active"
            >
              <img
                src={item}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        {/* SVG pour le bouton précédent */}
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        {/* SVG pour le bouton suivant */}
      </button>
    </div>
  );
};

export default Carousel;
