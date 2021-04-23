import { useState } from "react";
import { Card } from "react-bootstrap";
import Axios from "axios";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [artist, setArtist] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`
    );
    console.log(response.data.artists);
    setArtist(response.data.artists);
  };

  const renderArtist = () => {
    return artist.map((artists) => {
      return (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={artists.strArtistLogo} />
          <Card.Body>
            <Card.Title>{artists.strArtist}</Card.Title>
            <Card.Text>Date Formed: {artists.intFormedYear}</Card.Text>
            <Card.Text>Genre: {artists.strGenre}</Card.Text>
            <Card.Text>
              Website: <a href={artists.strWebsite}>{artists.strWebsite}</a>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <div className="App">
      <h1>Search for an Artist</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder="Search for an Artist" />
      </form>
      {renderArtist()}
    </div>
  );
}

export default App;
