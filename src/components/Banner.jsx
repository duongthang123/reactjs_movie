import IconRating from "../assets/rating.png";
import IconRatingHalf from "../assets/rating-half.png";
import ImgTemp from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
    return (
        <div className="w-full h-[600px] bg-[url(/banner.png)] 
        bg-center bg-no-repeat bg-cover relative">
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40" />
            <div className="w-full h-full flex items-center justify-center space-x-[30px] p-4 relative z-20"> 
                <div className="flex flex-col space-y-5 items-baseline w-[50%]">
                    <p className="text-white bg-gradient-to-r from-red-600 to-white text-md py-2 px-3 rounded-sm cursor-pointer">
                        TV SHOW
                    </p>
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-white text-[26px] font-bold md:text-[40px]">Nghe nói em thích tôi</h1>
                        <div className="flex items-center space-x-3">
                            <img src={IconRating} alt="rating" className="w-4 h-4 md:w-8 md:h-8 z-21"/>
                            <img src={IconRating} alt="rating" className="w-4 h-4 md:w-8 md:h-8"/>
                            <img src={IconRating} alt="rating" className="w-4 h-4 md:w-8 md:h-8"/>
                            <img src={IconRatingHalf} alt="rating" className="w-4 h-4 md:w-8 md:h-8"/>
                        </div>
                        <p className="text-white text-[16px] md:text-[20px] line-clamp-2">
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived
                            not only five centuries, but also the leap into electronic
                            typesetting,
                        </p>
                        <div className="flex items-center space-x-4 pt-4">
                            <button className="p-3 cursor-pointer text-white bg-black rounded-sm font-bold text-[12px] md:text-[16px]">Chi tiết</button>
                            <button className="p-3 cursor-pointer text-white bg-red-600 rounded-sm font-bold text-[12px] md:text-[16px]">Xem phim</button>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] flex justify-center items-center">
                    <div className="w-[300px] h-[400px] relative group cursor-pointer">
                        <img 
                            src={ImgTemp}
                            alt="temp"
                            className="w-full h-full object-cover"
                        />
                        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center backdrop-blur-sm opacity-0 
                                        group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                            <img 
                                src={IconPlay}
                                alt="play"
                                className="w-16 h-16 relative z-20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;