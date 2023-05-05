import React, { useEffect, useState, useCallback } from 'react'
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal'

const Row = ({title, id, fetchUrl}) => {
  const [movies, setMovies] = useState([]) // 영화 정보 저장
  const [modalOpen, setModalOpen] = useState(false) // 영화 상세 정보 창 오픈하기
  const [movieSelected, setMovieSelection] = useState({}) // 클릭한 그 영화의 정보 가져오기!


  const fetchMovieData = useCallback( async () => { 
    // useCallback : 해당 함수를 쓰지 않을떄 호출하지 않고 필요할때만 호출하겠다.
    const response = await axios(fetchUrl);
    setMovies(response.data.results);
  },[fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  },[fetchMovieData]);

  const handleClick =  (movie) =>
  {
    setModalOpen(true);      // 모달 열기
    setMovieSelection(movie); // 클릭한 영화의 정보 설정하기
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
           }}>
            {'<'}
          </span>
        </div>
        <div id = {id} className='row__posters'>
          {movies.map(movie => (
            <img
              key={movie.id}
              className='row__poster'
              src = {`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt= {movie.name} 
              onClick = {() => handleClick(movie)}/>
          ))}
        </div>
        <div className='slider__arrow-right'>
            <span className = 'arrow'
             onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
             }}>
              {'>'}
            </span>
        </div>
      </div>

      { modalOpen &&
      <MovieModal
      {...movieSelected}
        setModalOpen = {setModalOpen} //다시 창을 닫아야 하니까 open 정보를 props로 전달!
        />
      }
    </div>
  )
}

export default Row
