import axios from '../../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
  const[searchResults, setSearchResults] = useState([]) // 검색으로 찾은 정보들이 들어감.
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchTerm = query.get("q"); // q = 안에 있는 값을 넣어줌.


  // searchTerm이 바뀔때마다 찾은 정보 업데이트 해주기.
  useEffect(() => {
    if(searchTerm) { // 입력한 값이 있다면
      fetchSearchMovie();
    }

  }, [searchTerm]); // searchTerm이 변경되면 다시 호출

  // 비동기 요청으로 api 서버에게 요청한다. (async, await)
  const fetchSearchMovie = async () => {
    try{
      const response = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`);
      setSearchResults(response.data.results);
    }catch (error){
      console.log(error);
    }
  }

  if (searchResults.length > 0) { // 검색창에 값이 있을때
    return (
      <section className = 'search-container'>
        {searchResults.map((movie) => {
          if(movie.poster_path != null && movie.backdrop_path != null && movie.media_type != "person") {
            const movieImgUrl = `https://image.tmdb.org/t/p/w500` + movie.backdrop_path;
            return (
              <div className = 'movie' key = {movie.id}>
                <div className = 'movie__column-poster' onClick = {()=>{
                  navigate(`/${movie.id}`)
                }}>
                  <img src={movieImgUrl} alt="movie" className = "movie__poster" />
                </div>

              </div>
            )
        }
        })}
        
      </section>
    )
  }
  else { // 검색창에 값이 없을때
    return (
      <section className = 'no-result'>
        <div className='no-results__text'>
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>

        </div>
      </section>
    )
  }

  return (
    <div>

    </div>
  )
}

export default SearchPage
