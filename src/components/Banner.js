import axiosInstance from '../api/axios';
import requests from '../api/request';
import React , {useEffect, useState} from 'react'
import styled from 'styled-components'
import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState ([]);
  const [isClicked, setIsClicked] = useState (false);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async() => {
    // 현재 상영중인 영화정보를 얻어온다. 
    // 동기(어떤 일이 끝나면 그 이후에 실행)로 처리를 해야하기에 async, await를 사용한다.
    const request = await axiosInstance.get(requests.fetchNowPlaying)
    // axios를 사용하면 api주소나 api 코드 정보 등을 매번 칠필요가 없어진다.

    // 여러 영화들 중에 영화 하나를 랜덤으로 가져온다.
    const movieId = request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 특정 영화의 상세한 정보를 가져오기.
    const {data : movieDetail} = await axiosInstance.get(
      `movie/${movieId}`,
      {params : {append_to_response : "videos"},} 
      );
      setMovie(movieDetail);
  }

  const truncate = (str , n) =>{
    return str?.length > n? str.substring(0,n) + "..." : str;
  }

  if (isClicked) { // 영상 play버튼이 눌리면!
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src = {`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width= "640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
            >
            </Iframe>
          </HomeContainer>
        </Container>
        <button onClick = {() => setIsClicked(false)}>
          X
        </button>
      </>
    )
  }
  else {
    return (
      <header
        className='banner'
        style={
          {
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
  
          <div className='banner__buttons'>
            {movie.videos?.results[0]?.key &&
              <button
                className='banner__button play'
                onClick = { () => setIsClicked(true)}
              >
                Play
              </button>
                }
  
          </div>
          <p className='banner__description'>
            {truncate(movie.overview, 100)}
          </p>
  
        </div>
        <div className='banner--fadeBottom'></div>
  
      </header>
    )
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;