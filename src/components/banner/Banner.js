import React, { Fragment } from "react";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const { data } = useSWR(tmdbApi.getMoviesList("upcoming"), fetcher);
  const movies = data?.results || [];
  return (
    <section className="page-container relative banner h-[500px] mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

function BannerItem({ item: { poster_path, title, id } }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={tmdbApi.imageOriginal(poster_path)}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="px-4 py-2 border border-white rounder-mb">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounder-mb">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounder-mb">
            Action
          </span>
        </div>
        <Button
          bgColor="primary"
          className="px-4 py-2 rounded-lg w-auto"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch now
        </Button>
        {/* <button className="bg-primary px-4 py-2 rounded-lg">Watch now</button> */}
      </div>
    </Fragment>
  );
}

export default Banner;
