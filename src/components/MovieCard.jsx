import icon from "../assets/images/movie-btn.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(
    movie?.vote_average ? movie?.vote_average / 2 : 0
  );
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="md:w-96 w-80   mx-auto  bg-materialBlue">
      <img
        src={`https://www.themoviedb.org/t/p/w500/${movie?.poster_path}`}
        alt="..."
        className="md:cursor-pointer w-full h-96 object-cover"
        onClick={() => navigate("/movie/" + movie?.id)}
      />
      <div className="p-3 flex justify-between">
        <div>
          <h6 className="text-lg font-semibold">
            {movie?.title?.length > 20
              ? movie?.title?.slice(0, 20) + "..."
              : movie?.title}
          </h6>
          <div className="flex gap-1.5 items-center mt-1.5 text-[#F8D70F]">
            {fullStars &&
              Array(fullStars)
                .fill()
                .map((_, i) => <FaStar key={`star-${i}`} />)}
            {hasHalfStar && <FaStarHalfAlt />}
            {emptyStars &&
              emptyStars >= 0 &&
              Array(emptyStars)
                .fill()
                .map((_, i) => <FaRegStar key={`star-empty-${i}`} />)}
          </div>
        </div>
        <button>
          <img
            src={icon}
            width={50}
            height={50}
            alt="..."
            onClick={() => navigate("/movie/" + movie?.id)}
          />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
