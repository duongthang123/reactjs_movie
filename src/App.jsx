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
      console.log(data.results);
      setMovieSearch(data.results);
      
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi'

      const [rest1, rest2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ])

      const data1 = await rest1.json();
      const data2 = await rest2.json();
      setMovie(data1.results)
      setMovieRate(data2.results)
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
