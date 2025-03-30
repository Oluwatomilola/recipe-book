import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, deleteRecipe }) => {
  const { id, title, description, ingredients, instructions, prepTime, cookingTime } = recipe;

  return (
    <div className="recipe-card">
      <h3>{title}</h3>
      {description && <p><strong>Description:</strong> {description}</p>}
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      {instructions && <p><strong>Instructions:</strong> {instructions}</p>}
      {prepTime && <p><strong>Preparation Time:</strong> {prepTime}</p>}
      {cookingTime && <p><strong>Cooking Time:</strong> {cookingTime}</p>}
      <button onClick={() => deleteRecipe(id)}>Delete</button>
    </div>
  );
};

export default RecipeCard;