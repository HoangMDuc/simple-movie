import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbApi } from "../config";
const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbApi.getMovieDetails(movieId), fetcher);

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("${tmdbApi.imageOriginal(backdrop_path)}")`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbApi.imageOriginal(poster_path)}
          alt=""
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
      <h1 className="text-center text-4xl font-bold mb-10 text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex justify-center items-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border border-primary text-primary rounded-md"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto">
        {overview}
      </p>
      <MovieCreDit></MovieCreDit>
      <MovieVideo></MovieVideo>
      <MoviesSimilar></MoviesSimilar>
    </div>
  );
};

function MovieCreDit() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbApi.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length === 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl text-center mb-10">Cast</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => {
          return (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbApi.imageOriginal(item.profile_path)}
                alt=""
                className="w-full object-cover rounded-lg h-[300px] mb-3"
              />
              <h2 className="text-xl font-medium">{item.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function MovieVideo() {
  const { movieId } = useParams();

  const { data } = useSWR(
    tmdbApi.getMovieMeta(movieId, "videos"),

    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length === 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {data.results.slice(0, 2).map((item) => (
          <div key={item.id}>
            <h3 className="mb-5 text-xl font-medium bg-secondary inline-block p-3">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="727"
                height="409"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Những kỹ năng thực sự cần thiết cho một lập trình viên | Vlog"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoviesSimilar() {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbApi.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length === 0) return null;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium">Similar Movie</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
