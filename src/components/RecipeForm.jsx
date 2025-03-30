import React, { useState } from 'react';
import './RecipeForm.css'; 

const RecipeForm = ({ addRecipe }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients) {
      alert('Title and at least one ingredient are required.');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      description,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      instructions,
      prepTime,
      cookingTime,
    };

    addRecipe(newRecipe);
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setPrepTime('');
    setCookingTime('');
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        placeholder="Instructions (step-by-step)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preparation Time (e.g., 15 min)"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cooking Time (e.g., 30 min)"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;