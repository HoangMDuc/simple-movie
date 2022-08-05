import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { withErrorBoundary } from "react-error-boundary";
const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbApi.getMoviesList(type), fetcher);
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
};

const FallbackComponent = () => (
  <p className="bg-red-50 text-red-400">
    Some thing went wrong with the component
  </p>
);

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
