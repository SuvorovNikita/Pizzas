import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzBlock from './components/PizzaBlock';

import pizzas from './assets/pizzas.json';

import './scss/app.scss';
console.log(pizzas);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((obj) => (
              <PizzBlock
                title={obj.title}
                price={obj.price}
                image={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
