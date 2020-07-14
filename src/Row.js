import React, { useState, useEffect } from "react";
import './Row.css'
import axios from "./axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  // Snippet of code that runs when specific conditions are met
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
    // blank brackets = run once on page load
  }, [fetchUrl]);

  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
          autoplay: 1,
      }
  }

  const handleClick = (movie) => {
      if(trailerUrl) {
          setTrailerUrl('');
      } else {
          movieTrailer(movie?.name || "").then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
        }).catch(error => console.log(error));
      }
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
        //   Give a key so that if any data changes within the row getting pulled, it will not re-render the entire component, but rather just the single datapoint.
            key={movie.id}
            // if statement for larger format
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
            // if/else statement for large/small rows
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
