import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbApi } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 h-full select-none">
      <img
        src={tmdbApi.imageOriginal(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-white text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button bgColor="secondary" onClick={() => navigate(`/movies/${id}`)}>
          Watch Now
        </Button>
      </div>
    </div>
  );
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400 ">
      Some thing went wrong with this components
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
