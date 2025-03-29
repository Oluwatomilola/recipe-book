import React from 'react'
import Recipe from './Recipe';

const RecipeList = () => {
  //List containing different recipes
  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
      <><Recipe key={recipe.id}
          recipe={recipe} /><h3>{recipe.title}</h3><p>{recipe.preview}</p><p>Cooking Time: {recipe.cookingTime || 'N/A'}</p></>
      </div>
      ))}
   
  );
};

export default RecipeList
