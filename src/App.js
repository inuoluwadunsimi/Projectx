import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./component/MovieComponent";
import MovieInfoComponent from "./component/MovieInfoComponent";


export const API_KEY = "29e44cd1";



const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 80%;
`;
const Navlink = styled.a`
  text-decoration : none
  font-size:20px;
  font-weight:bold;
  cursor:pointer;
`


function App() {
  const [searchParams, setSearchParams] = useState("");
  const [likes, setLikes] = useState([])

  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, setTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    setMovieList(response.data.Search);
  };
  function handleLiked(){
    console.log(likes)
    
    if (likes.length===0){
      return(
        <div className={{display:'flex',flexDirection:'column'}}>
        <h1 style={{textAlign:'center'}}>No Items liked</h1>
        <p style={{textAlign:'center'}}>search for a movie to add</p>
        </div>
      )
    }
    else if (likes.length>0){
      return(
        <>
        <h1>Liked movies</h1>
        <MovieListContainer>
          {likes.map((movie, index) => (
            <MovieComponent
                key={index}
                movie={movie}
                liked={true}
                onMovieSelect={onMovieSelect}
                likes={likes} 
                setLikes={setLikes}
              />
          ))}
        </MovieListContainer>
        </>
      )
    }
    
  }

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    setSearchParams(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    setTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="https://media.istockphoto.com/photos/red-play-icon-button-on-white-background-social-media-and-sign-3d-picture-id1348212541?b=1&k=20&m=1348212541&s=170667a&w=0&h=6L67l228RvKoBbEzcw7LtfZDspPL3AQP4P9QZmeziIQ=" />
          Grock's Cinema
        </AppName>
        <SearchBox>
          <SearchIcon src="./images/search.svg"/>
          <SearchInput
            placeholder="Search Movie"
            value={searchParams}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
        {handleLiked()}
      {searchParams?<h1>{`search results of ${searchParams}:`}</h1>:<h1>Search for your favourite movies</h1>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
                key={index}
                movie={movie}
                liked={false}
                onMovieSelect={onMovieSelect}
                likes={likes} 
                setLikes={setLikes}
              />
          ))
        ) : (
          <Placeholder src="https://media.istockphoto.com/photos/red-play-icon-button-on-white-background-social-media-and-sign-3d-picture-id1348212541?b=1&k=20&m=1348212541&s=170667a&w=0&h=6L67l228RvKoBbEzcw7LtfZDspPL3AQP4P9QZmeziIQ=" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;