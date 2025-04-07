import React, { useState } from "react";
import "./SearchModal.css";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchRecipes = async (query) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_REACT_RECIPE_API_KEY; 
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}` 
      );
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery.trim());
    }
  };

  const handleAddToRecipeList = (recipe) => {
    const recipeData = {
      id: recipe.id, // Use the Spoonacular recipe ID
      title: recipe.title,
      description: recipe.summary
        ? recipe.summary.replace(/<[^>]+>/g, "") // Save the full description
        : "No description available.",
      ingredients: recipe.extendedIngredients
        ? recipe.extendedIngredients.map((ingredient) => ingredient.original)
        : ["No ingredients available."],
      instructions: recipe.analyzedInstructions && recipe.analyzedInstructions.length
        ? recipe.analyzedInstructions[0].steps.map((step) => step.step)
        : ["No instructions available."],
      prepTime: recipe.preparationMinutes || "N/A",
      cookTime: recipe.cookingMinutes || "N/A",
    };
  
    // Save the recipe to localStorage
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    localStorage.setItem("recipes", JSON.stringify([...savedRecipes, recipeData]));
  
    alert("Recipe added to the Recipe List!");
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Search Recipes</h2>
        <input
          type="text"
          placeholder="Search for recipes or ingredients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <div className="scrollable">
          {loading ? (
            <p>Loading...</p>
          ) : selectedRecipe ? (
            <div className="recipe-details">
              <h3>{selectedRecipe.title}</h3>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{selectedRecipe.summary.replace(/<[^>]+>/g, "")}</p>
              <h4>Ingredients:</h4>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))}
              </ul>
              <h4>Instructions:</h4>
              <ul>
                {selectedRecipe.analyzedInstructions &&
                selectedRecipe.analyzedInstructions.length > 0 ? (
                  selectedRecipe.analyzedInstructions[0].steps.map((step, index) => (
                    <li key={index}>{step.step}</li>
                  ))
                ) : (
                  <li>No instructions available.</li>
                )}
              </ul>
              <button onClick={() => setSelectedRecipe(null)}>Back to Results</button>
              <button onClick={() => handleAddToRecipeList(selectedRecipe)}>
                Add to Recipe List
              </button>
            </div>
          ) : (
            results.map((recipe, index) => (
              <div key={index} className="recipe-item">
                <h3>{recipe.title}</h3>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "100px", height: "100px" }}
                />
                <button onClick={() => fetchRecipeDetails(recipe.id)}>
                  View Full Recipe
                </button>
                <button onClick={() => handleAddToRecipeList(recipe)}>
                  Add to Recipe List
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;