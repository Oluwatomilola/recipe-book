import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, viewFullRecipe, toggleFavorite, isFavorite , deleteRecipe}) => {
  const { title, prepTime, cookingTime } = recipe;
  const truncatedDescription = recipe.description.length > 100
    ? recipe.description.slice(0, 100) + "..."
    : recipe.description;

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{title}</h3>
      {truncatedDescription && <p className="recipe-description">{truncatedDescription}</p>}
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
      <button onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
    </div>
  );
};

export default RecipeCard;