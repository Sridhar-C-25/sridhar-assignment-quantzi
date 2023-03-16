import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieApi } from "../services/MovieApi";

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    function getMovie() {
      console.log(id);
      movieApi
        .get("/movie/" + id)
        .then((res) => {
          console.log(res.data);
          setMovie(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getMovie();
  }, []);
  return (
    <section className="container md:px-auto px-4 md:py-auto py-20">
      {movie && (
        <div className="flex items-center flex-wrap gap-6">
          <div className="flex-1 text-lg leading-9 flex flex-col divide-y-[1px] gap-4">
            <h2 className="text-2xl">{movie?.original_title}</h2>
            <p>Rating : {movie?.vote_average}</p>
            <p className="text-gray-400">{movie?.overview}</p>
            <p>Release Date : {movie?.release_date}</p>
            <p>Original Language : {movie?.original_language}</p>
          </div>
          <img
            src={`https://www.themoviedb.org/t/p/original${movie?.backdrop_path}`}
            alt="..."
            className="flex-1 max-w-2xl w-full"
          />
        </div>
      )}
    </section>
  );
};

export default Movie;
