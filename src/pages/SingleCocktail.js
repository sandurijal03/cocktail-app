import React from 'react';

import { useParams, Link } from 'react-router-dom';

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const getCocktail = async function () {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        if (data.drinks) {
          let {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getCocktail();
  }, [id]);
  if (loading) {
    return <h2 classname='section-title'>Loading.......</h2>;
  }
  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      instructions,
      glass,
      ingredients,
    } = cocktail;
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          back home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>name: {name} </p>
            <p>category: {category} </p>
            <p>info: {info} </p>
            <p>glass: {glass} </p>
            <p>instructions: {instructions} </p>
            <p>
              ingredients:{' '}
              {ingredients.map((ingredient, index) => {
                return ingredient ? (
                  <span key={index}>{ingredient}</span>
                ) : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
