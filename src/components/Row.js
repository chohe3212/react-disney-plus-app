import React, { useEffect, useState, useCallback } from 'react'
import axios from '../api/axios'
import './Row.css'
import styled from 'styled-components'
import MovieModal from './MovieModal'

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

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
    <Container>
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }}
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 3,
          },
        }}
      >
        <Content id={id}>
          {movies.map(movie => (
            <SwiperSlide>
              <Wrap>
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.name}
                onClick={() => handleClick(movie)} />
              </Wrap>
            </SwiperSlide>
          ))}
        </Content>
      </Swiper>



        {modalOpen &&
          <MovieModal
            {...movieSelected}
            setModalOpen={setModalOpen} //다시 창을 닫아야 하니까 open 정보를 props로 전달!
          />
        }

    </Container>
  )
}

export default Row

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`

`;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0/ 69%) 0px 26px 30px -10px,
            rgb(0 0 0 /73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position : relative;
  transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
  border:3px solid rgba(249, 249, 249, 0.1);
  img {
    inset : 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb (0 0 0 /80%) 0px 40px 58px -16px,
              rgb (0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
  }

`;