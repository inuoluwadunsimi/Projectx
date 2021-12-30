import React from "react";
import {flushSync} from "react-dom";
import styled from "styled-components";
import { useState } from "react";


const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const MovieName = styled.span`
  display: flex;
  justify-content:space-between;
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const Favourite = styled.img`
justify-content: centre
width:20px;
height:20px;
`


const MovieComponent = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const [iLike,setILike]=useState(props.liked);
  function handleClick(e) {
    e.stopPropagation()
    // flushSync(()=>setILike(!iLike))
    
    console.log(iLike)
    if (props.likes.indexOf(props.movie)===-1){
      props.setLikes([...props.likes, props.movie])
      return
    }
    else if (props.likes.indexOf(props.movie)>-1){
      const newLikes=props.likes.filter((like)=>like!==props.movie)
      props.setLikes(newLikes)
      return
    }

    

  }


  return (
    <MovieContainer
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={Poster} alt={Title} />
      <MovieName>
        {Title}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ width: '24px' }} fill={iLike?'red':'none'} viewBox="0 0 24 24" stroke="red" onClick={(e)=>{
          setILike(!iLike)
          handleClick(e)}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
      {/* <button onClick={(e)=>handleClick(e)}  > like </button> */}
      {/* <Favourite  likes={likes} setLikes={setLikes} src="./fave.svg" /> */}
    </MovieContainer>
  );
};
export default MovieComponent;