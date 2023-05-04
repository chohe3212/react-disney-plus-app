import axiosInstance from '../api/axios';
import requests from '../api/request';
import React , {useEffect, useState} from 'react'

const Banner = () => {
  const [movie, setMovie] = useState ([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async() => {
    // 현재 상영중인 영화정보를 얻어온다. 
    // 동기(어떤 일이 끝나면 그 이후에 실행)로 처리를 해야하기에 async, await를 사용한다.
    const response = await axiosInstance.get(requests.fetchNowPlaying)
    // axios를 사용하면 api주소나 api 코드 정보 등을 매번 칠필요가 없어진다.

    // 여러 영화들 중에 영화 하나를 랜덤으로 가져온다.
    const movieId = requests.data.results[
      Math.floor(Math.random() * requests.data.results.length)
    ].id;

    // 특정 영화의 상세한 정보를 가져오기.
    const {data : movieDetail} = await axiosInstance.get(
      `movies/${movieId}`,
      {params : {append_to_response : "videos"},} 
      );

  }

  return (
    <div>
      
    </div>
  )
}

export default Banner
