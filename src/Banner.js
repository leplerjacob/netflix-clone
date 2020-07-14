import React, { useState, useEffect } from "react";
import axios from "./axios";
import './Banner.css'
import requests from "./requests";


function Banner() {
  const [movie, setMovie] = useState([]);

  // useEffect to select randomly a movie to display to the Banner
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
      return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // movie? tells app if data point is undefined to handel elegantly
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;

// Banner component:
// <Banner>
//      {background image}
//  <banner_contents>
//      {title}
//      <banner_buttons>
//          {div > 2 buttons}
//          {Description}
//      <close banner_buttons>
// <close banner_contents>
// <close Banner>
