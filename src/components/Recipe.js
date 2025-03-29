import React, {useState, useEffect} from 'react'

const Recipe = ({ recipe }) => {
  return (
    <div className='recipe'>
      <h2>{recipe.title}</h2>
      <p>{recipe.preview}</p>
      {recipe.cookingTime && (
        <p>
          Cooking Time:<span>{recipe.cookingTime}</span>
        </p>
      )}
      <ul>
        {recipe.ingredients.map((ingredient,index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{recipe.description}</p>
      </div>
  );
};

export default RecipeList
