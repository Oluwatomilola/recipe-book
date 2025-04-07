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
      <div className='recipe-time'>
        <p >
          <strong>Prep Time:</strong> {prepTime || 'N/A'}
        </p>
        <p>
          <strong>Cook Time:</strong> {cookingTime || 'N/A'}
        </p>
      </div>
      <div className='button-container'>
        <button className="full-recipe-button" onClick={() => viewFullRecipe(recipe)}>
        Full Recipe
        </button>
        <button className='delete-button' onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
      </div>

      <button className="favorite-button" onClick={() => toggleFavorite(recipe.id)}>
          {isFavorite ? '★' : '☆'} {/* Star icon for favorite */}
        </button>
    </div>
  );
};

export default RecipeCard;