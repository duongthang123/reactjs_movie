import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal';
import YouTube from "react-youtube";

const modalStyle = {
  overlay: {
    position: 'fixed',
    zIndex: 9999
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const opts = {
      height: '390',
      width: '640',
      playerVars: {
      autoplay: 1,
      },
    };

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      setTrailerKey(data.results[0].key);
      setModalIsOpen(true);
      console.log(data);
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  }
  return (
    <div className='text-white p-10 mb-10 max-w-full'>
        <h2 className="uppercase text-xl font-bold mb-4">{title}</h2>
        <Carousel
          responsive={responsive}
          infinite={true}
        >
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
        </Carousel>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <YouTube videoId={trailerKey} opts={opts} />
        </Modal>
    </div>
  )
}

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    
}

export default MovieList