import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import './Home.css';
import { Link, NavLink } from 'react-router-dom'; // Correct import
import SearchModal from '../components/SearchModal'; // Import the SearchModal component

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="navbar">
        <img className="logo" src={Logo} alt="Logo" />

        <ul className="nav">
          <li>
            <Link to="/" className='link-home'>Home</Link>
          </li>
          <li>
            <NavLink to="/recipe-list" className='link-home'>Recipe List</NavLink>
          </li>
        </ul>
      </div>

      <div className="About">
        <h2>About</h2>
        <p className="intro">
          Welcome to our Recipe Book app, your ultimate culinary companion! Whether you're a seasoned chef or just starting your cooking journey, our app offers a wide variety of delicious, easy-to-follow recipes for every taste and occasion. From quick weeknight dinners to indulgent desserts, discover step-by-step instructions, helpful tips, and handy features like personalized favorites and shopping lists. Explore new flavors, try exciting dishes, and transform your kitchen into a gourmet haven—one recipe at a time!
        </p>
        <button className="search" onClick={() => setIsModalOpen(true)}>Search Recipes</button>
        <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;