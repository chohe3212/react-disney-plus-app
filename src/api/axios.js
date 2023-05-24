import axios from "axios";

const instatce = axios.create({
    baseURL: "http://api.themoviedb.org/3",
    params : {
        api_key: "a28a794b5e5f0ab5dd8380d024efebcf",
        language : "ko-KR",
    }
})
export default instatce;