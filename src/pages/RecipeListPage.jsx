import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import './RecipeListPage.css';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track the selected recipe for the modal
  const [showFavorites, setShowFavorites] = useState(false); // Track whether to show favorite recipes

  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setShowForm(false); // Close the form after adding a recipe
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const viewFullRecipe = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe to display in the modal
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null); // Close the modal by clearing the selected recipe
  };

  const filteredRecipes = showFavorites
    ? recipes.filter((recipe) => favorites.includes(recipe.id))
    : recipes;

  return (
    <div className="recipe-list-page">
      {/* Top-right corner links */}
      <div className="top-right-links">
        <Link to="/" className="home-link">
          Home
        </Link>
        <button className="add-recipe-button" onClick={() => setShowForm(true)}>
          Add Recipe
        </button>
        <button className="favorites-link" onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'View All Recipes' : 'View Favorites'}
        </button>
      </div>

      <h1>{showFavorites ? 'Favorite Recipes' : 'Recipe List'}</h1>
      {filteredRecipes.length === 0 && !showForm && (
        <div className="no-recipes">
          <p>No recipes found. Add your recipes here!</p>
        </div>
      )}
      {filteredRecipes.length > 0 && (
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              viewFullRecipe={viewFullRecipe}
              deleteRecipe={deleteRecipe} // Pass deleteRecipe to RecipeCard
              toggleFavorite={toggleFavorite} // Pass toggleFavorite to RecipeCard
              isFavorite={favorites.includes(recipe.id)} // Check if the recipe is a favorite
            />
          ))}
        </div>
      )}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <RecipeForm addRecipe={addRecipe} closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedRecipe.title}</h2>
            <p><strong>Description:</strong> {selectedRecipe.description}</p>
            <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p><strong>Prep Time:</strong> {selectedRecipe.prepTime || 'N/A'}</p>
            <p><strong>Cook Time:</strong> {selectedRecipe.cookingTime || 'N/A'}</p>
            <button className="close-modal" onClick={closeRecipeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeListPage;