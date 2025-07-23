import { useEffect, useState } from 'react';
import Banner from './components/Banner'
import Header from './components/Header'
import MovieList from './components/MovieList';
import '../src/App.css';
import MovieSearch from './components/MovieSearch';
import {MovieProvider} from './context/MovieProvider';

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [movieNowplaying, setMovieNowplaying] = useState([]);

  const handleSearch = async (searchValue) => {
    setMovieSearch([]);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=vi&page=1`;
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
          }
        };

      const searchMovie = await fetch(url, options);
      const data = await searchMovie.json();
      setMovieSearch(data.results);
      
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
          const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
          }
        };
        const endpoints = [
          'https://api.themoviedb.org/3/movie/popular?language=vi',
          'https://api.themoviedb.org/3/movie/top_rated?language=vi',
          'https://api.themoviedb.org/3/movie/now_playing?language=vi'
        ];

        const [popularRes, topratedRes, nowplayingRes] = await Promise.all(
          endpoints.map(url => fetch(url, options))
        ); 

        const [popularData, topratedData, nowplayingData] = await Promise.all([
          popularRes.json(),
          topratedRes.json(),
          nowplayingRes.json(),
        ]);

        setMovie(popularData.results || []);
        setMovieRate(topratedData.results || []);
        setMovieNowplaying(nowplayingData.results || []);
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchMovie();
  }, [])

  return (
    <>
      <MovieProvider>
        <div className='bg-black'>
          <Header onSearch={handleSearch}/>
          <Banner />
          {movieSearch.length > 0 ? (
            <MovieSearch 
              title={'Kết quả tìm kiếm'} 
              data={movieSearch}
            />
          ) : (
            <>
              <MovieList title={'Đang Chiếu'} data={movieNowplaying}/>
              <MovieList title={'Phim Hot'} data={movie}/>
              <MovieList title={'Phim Đề cử'} data={movieRate}/> 
            </>
          )}
          
        </div>
      </MovieProvider>
      
    </>
  )
}

export default App
