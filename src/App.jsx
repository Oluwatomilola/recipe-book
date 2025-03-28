import './App.css';
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import RecipeList from './components/RecipeList'

function App() {

  return (
    <>
<Home/>
{/*       <Routes>
        <Home />
      <Route path="/" element={<Home />} />
      <Route path="/RecipeList" element={<RecipeList />} />
      </Routes> */}
    </>
  )
}

export default App
