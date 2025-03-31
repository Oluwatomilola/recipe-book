import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, viewFullRecipe, toggleFavorite, isFavorite }) => {
  const { title, description, prepTime, cookingTime } = recipe;

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{title}</h3>
      {description && <p className="recipe-description">{description}</p>}
      <p className="recipe-time">
        <strong>Prep Time:</strong> {prepTime || 'N/A'}
      </p>
      <p className="recipe-time">
        <strong>Cook Time:</strong> {cookingTime || 'N/A'}
      </p>
      <button className="full-recipe-button" onClick={() => viewFullRecipe(recipe)}>
        Full Recipe
      </button>
      <button className="favorite-button" onClick={() => toggleFavorite(recipe.id)}>
        {isFavorite ? '★' : '☆'} {/* Star icon for favorite */}
      </button>
    </div>
  );
};

export default RecipeCard;