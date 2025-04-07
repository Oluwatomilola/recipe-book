import React, { useState, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false); // Track whether the user is editing a recipe
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Track whether the delete confirmation modal is open
  const [recipeToDelete, setRecipeToDelete] = useState(null); // Track the recipe to be deleted

  // Sync recipes with local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    setShowForm(false); // Close the form after adding a recipe
  };

  const editRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setIsEditing(false); // Exit editing mode
    setSelectedRecipe(null); // Close the modal
  };

  const confirmDeleteRecipe = (id) => {
    setRecipeToDelete(id); // Set the recipe to be deleted
    setDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const deleteRecipe = () => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeToDelete);
    setRecipes(updatedRecipes);
    setDeleteModalOpen(false); // Close the delete confirmation modal
    setRecipeToDelete(null); // Clear the recipe to delete
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
    setIsEditing(false); // Exit editing mode if active
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false); // Close the delete confirmation modal
    setRecipeToDelete(null); // Clear the recipe to delete
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
      <div className="recipe-list-container">
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              viewFullRecipe={viewFullRecipe}
              deleteRecipe={() => confirmDeleteRecipe(recipe.id)} // Open delete confirmation modal
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(recipe.id)}
            />
          ))}
        </div>
      </div>
    )}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <RecipeForm addRecipe={addRecipe} closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
      {selectedRecipe && !isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedRecipe.title}</h2>
            <p><strong>Description:</strong> {selectedRecipe.description}</p>
            <p><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
            <p><strong>Prep Time:</strong> {selectedRecipe.prepTime || 'N/A'}</p>
            <p><strong>Cook Time:</strong> {selectedRecipe.cookTime || 'N/A'}</p>
            <button className="close-modal" onClick={closeRecipeModal}>
              Close
            </button>
            <button
              className="edit-recipe-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Recipe
            </button>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <RecipeForm
              addRecipe={editRecipe}
              closeForm={closeRecipeModal}
              initialData={selectedRecipe}
            />
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content-confirm">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this recipe?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={deleteRecipe}>
                Yes
              </button>
              <button className="cancel-button" onClick={closeDeleteModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeListPage;