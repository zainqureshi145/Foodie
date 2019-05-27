import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
//import APP_ID from './key';
//import APP_KEY from './key';
import './App.css';
import { async } from 'q';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Hello World</h1>
//       </header>
//     </div>
//   );
// }

const App = () => {

  const APP_ID = "0cda4329";
  const APP_KEY = "1986e794af7179646fab7aa1ba6b5b2b";

  //const exampleRequest = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [recipes, setRecipes] = useState([]);//State
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipies();
  }, [query]);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);// Make sure you add await when working with
    //promise, (Some data which can take some time to process)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <h1>Search Food Recipe Using Main Ingredients</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
