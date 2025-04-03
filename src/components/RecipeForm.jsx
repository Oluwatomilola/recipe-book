import React, { useState, useEffect } from 'react';
import './RecipeForm.css';

const RecipeForm = ({ addRecipe, closeForm, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  // Pre-fill the form if initialData is provided
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setIngredients(initialData.ingredients ? initialData.ingredients.join(', ') : '');
      setInstructions(initialData.instructions || '');
      setPrepTime(initialData.prepTime || '');
      setCookingTime(initialData.cookingTime || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !ingredients) {
      alert('Title and at least one ingredient are required.');
      return;
    }

    const newRecipe = {
      id: initialData?.id || Date.now(), // Use existing ID if editing, otherwise generate a new one
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
        className="form-input"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-textarea"
        placeholder="Short Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        className="form-textarea"
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        className="form-textarea"
        placeholder="Instructions (step-by-step)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <input
        type="text"
        className="form-input"
        placeholder="Preparation Time (e.g., 15 min)"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
      />
      <input
        type="text"
        className="form-input"
        placeholder="Cooking Time (e.g., 30 min)"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
      />
      <div className="form-buttons">
        <button type="submit" className="form-button">
          {initialData ? 'Save Changes' : 'Add Recipe'}
        </button>
        <button type="button" className="form-button" onClick={closeForm}>
          Close
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;