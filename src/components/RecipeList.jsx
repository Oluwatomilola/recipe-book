
import React, { useState, useEffect }from 'react';
import Recipe from './recipe';

const RecipeList = () => {
  //Initialize state to store recipes
  const [ recipes, setRecipes ] = useState([]);
  const [loading, setLoading] = useState(true)
  // Fetch recipes from MealDB API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await
        fetch('https://www.themealdb.com/api/json/v1/1filter.php?c=Beef');
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }  
    };
    fetchRecipes();
    }, []);

    // Render the recipe list
  return (
    <div className="recipe-list">
      {loading ? (
        <p>Loading...</p>
      ) :(
      recipes.map((recipe, index) => (
      <Recipe key={recipe.idMeal}
          recipe={recipe} /><h3>{recipe.title}</h3><p>{recipe.preview}</p><p>Cooking Time: {recipe.cookingTime || 'N/A'}</p></>
      </div>
      ))}
   
  );
};

export default RecipeList
