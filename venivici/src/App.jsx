import { useState } from 'react'
import './App.css'
import Gallery from './components/Gallery.jsx'
import Anime from './components/Anime.jsx'

function App() {

  const [currentAnime, setCurrentAnime] = useState(null);
  const [prevAnime, setPrevAnime] = useState([]);

  const [bannedAttributes, setBannedAttributes] = useState({
    genres: [],
    rating: [],
    year: [],
  });

  // calling and calls are used to track the number of calls made to the API
  const [calling, setCalling] = useState(false);
  const [calls, setCalls] = useState(0);

  const callAPI = async() => {
    setCalling(true);
    setCalls(0);
    const url = "https://api.jikan.moe/v4/random/anime"
    
    let data;

    do {
      setCalls(prevCalls => prevCalls + 1);
      const response = await fetch(url);
      ({ data } = await response.json());
      console.log(data);
    } while (data.members < 50000 ||  // minimum popularity check (there's a popularity attribute but idk what it means)
      data.status === "Not yet aired" || // should've aired or is airing
      data.genres.some(genre => bannedAttributes.genres.includes(genre.name) || // removed genres
        ["Erotica, Hentai"].includes(genre.name)) || // default removed genres (cannot add these)
      bannedAttributes.rating.includes(data.rating)) // removed ratings
  
    setCurrentAnime(data);
    setPrevAnime([...prevAnime, data]);

    setCalling(false);
  }


  return (
    <div className="whole-page">
      <div className="main-page">
          <h1>What to watch?</h1>
          <h3>It might take a while, some of these anime are pretty obscure...</h3>
          <h4>(A minimum of 100000 people have these on their watchlist!)</h4>
          <button onClick={callAPI} className="button">Get an anime!</button>
          {calling ? <h3>Querying... {calls} total calls</h3> : null}
          <br></br>

          <Anime anime={currentAnime} 
            addAttribute={(type, value) =>
            setBannedAttributes((prevAttributes) => {
              const updatedAttributes = {
                ...prevAttributes,
                [type]: prevAttributes[type].includes(value)
                  ? prevAttributes[type] // if value already exists, keep the array unchanged
                  : [...prevAttributes[type], value], // otherwise, add the new value
              };
              console.log("Updated bannedAttributes:", updatedAttributes); // log the updated state
              return updatedAttributes;
            })
          }/>

          <div className="banned">
            <h3>Banned Attributes:</h3>
            <div>
              <h3>Genres:</h3>
              <ul>
                {bannedAttributes.genres.map((genre, index) => (
                  <button key={index}
                  onClick={() => setBannedAttributes((prevAttributes) => {
                    const updatedAttributes = {
                      ...prevAttributes,
                      genres: prevAttributes.genres.filter((value) => value !== genre),
                    };
                    console.log("Updated bannedAttributes:", updatedAttributes);
                    return updatedAttributes;
                  })}
                  
                  >{genre}</button>
                ))}
              </ul>
              <h3>Ratings:</h3>
              <ul>
                {bannedAttributes.rating.map((rating, index) => (
                  <button key={index}
                  onClick={() => setBannedAttributes((prevAttributes) => {
                    const updatedAttributes = {
                      ...prevAttributes,
                      rating: prevAttributes.rating.filter((value) => value !== rating),
                    };
                    console.log("Updated bannedAttributes:", updatedAttributes);
                    return updatedAttributes;
                  })}>
                    {rating}</button>
                ))}
              </ul>
            </div>
          </div>
      </div>
      <div className="gallery-container">
          <Gallery anime={prevAnime}/>
      </div>
    </div>
  )
}

export default App
