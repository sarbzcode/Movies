
const API_KEY = "c659cc1ce4d7c39075d8d83cb7e7dbe5";
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async (page=1) => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&certification_country=CA&certification.lte=14A&page=${page}`
    );
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
};