import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { movieApi } from "../services/MovieApi";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [itemOffset, setItemOffset] = useState(1);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function getMoviesData() {
      setLoading(true);
      setMovies(null);
      movieApi
        .get("/movie/popular?page=" + itemOffset)
        .then((res) => {
          // window.scroll(0,0)
          console.log(res?.data?.results);
          setMovies(res?.data?.results);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "--err from home movie list api");
        });
    }
    getMoviesData();
  }, [itemOffset]);
  const handlePageClick = (event) => {
    console.log(event.selected + 1);
    setItemOffset(event.selected + 1);
  };
  return (
    <div>
      <section className="bg-heroBg bg-center bg-cover h-screen !pt-0">
        <div className="container md:px-auto px-4 h-full grid place-items-center">
          <div className="text-center leading-loose flex flex-col gap-3">
            <h5 className="text-xl">Welcome to Our movie site</h5>
            <h2 className="md:text-7xl text-4xl uppercase font-bold">
              Our special <span className="text-redRose">Movies</span>
            </h2>
            <p className="max-w-lg mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industrioy. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown.
            </p>
            <button
              className="bg-redRose rounded-full px-6 font-medium mt-3
           py-2 w-fit mx-auto hover:bg-white hover:text-redRose duration-500"
            >
              Read More
            </button>
          </div>
        </div>
      </section>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(384px,1fr))",
        }}
        className="py-8 md:grid flex flex-wrap
          w-full justify-center  max-w-[120rem]  mx-auto  
      gap-5 "
      >
        {loading ? (
          <>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
            <div className="md:w-96 w-80 h-[30rem] animate-pulse  bg-gray-800"></div>
          </>
        ) : (
          movies?.map((movie) => (
            <div key={movie?.id}>
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
      <div className="paginate">
        <ReactPaginate
          className="flex items-center gap-2"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={500}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
