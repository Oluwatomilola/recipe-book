import React from 'react';
import Logo from '../assets/logo.png';
import './Home.css';
import { Link } from 'react-router-dom'; // Correct import

const Home = () => {
  return (
    <div>
      <div className="navbar">
        <img className="logo" src={Logo} alt="Logo" />

        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipe-list">Recipe List</Link>
          </li>
        </ul>
      </div>

      <div className="About">
        <h2>About</h2>
        <p className="intro">
          Welcome to our Recipe Book app, your ultimate culinary companion! Whether you're a seasoned chef or just starting your cooking journey, our app offers a wide variety of delicious, easy-to-follow recipes for every taste and occasion. From quick weeknight dinners to indulgent desserts, discover step-by-step instructions, helpful tips, and handy features like personalized favorites and shopping lists. Explore new flavors, try exciting dishes, and transform your kitchen into a gourmet haven—one recipe at a time!
        </p>
        <button className="search">Search</button>
      </div>
    </div>
  );
};

export default Home;