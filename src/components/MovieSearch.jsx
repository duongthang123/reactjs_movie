import { useContext } from 'react';
import { MovieContext } from '../context/MovieProvider';
import PropTypes from 'prop-types';

const MovieSearch = ({title, data}) => {
  const {handleTrailer} = useContext(MovieContext);

  return (
    <div className='text-white p-10 mb-10 max-w-full'>
        <h2 className="uppercase text-xl font-bold mb-4">{title}</h2>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
            {data?.map((item) => (
                <div
                  key={item.id}
                  className="space-x-4 w-[200px] h-[300px] relative bg-cover bg-no-repeat bg-center hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${item.poster_path})`
                  }}
                  onClick={() => handleTrailer(item.id)}
                >

                  <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
                  <div className="relative  p-4 flex flex-col items-center justify-end h-full">
                    <h3 className="uppercase text-md">
                      {item.title || item.original_title}
                    </h3>
                  </div>
                </div>
            ))}
        </div>
        
    </div>
  )
}

MovieSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieSearch