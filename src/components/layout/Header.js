import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="flex justify-center items-center py-5 gap-x-5 text-white mb-10">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
