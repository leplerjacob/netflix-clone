import React from "react";
import "./styling/App.css";
import requests from "./requests";
import Banner from "./layout/Banner";
import Nav from "./layout/Nav"
import Row from "./layout/Row";

// 2:57 youtube react netflix clone

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <Nav />

      <Banner />
      {/* the Row component takes in props 'title'. In Row.js  */}
      <Row
        title="NETFLIX_ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
