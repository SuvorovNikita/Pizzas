import React, { useEffect, useState, useContext, useRef } from 'react';
import { searchContext } from './../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Categories from '../components/Categories';

import PizzBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { list } from './../components/Sort';
import Sort from './../components/Sort';

function Home() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  //filter categories
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filters);
  const isMounted = useRef(false);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = useContext(searchContext);
  const [items, setItems] = useState([]);
  const [isLodiang, setIsLoading] = useState(true);

  const featchPizzas = () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://629dfa3f3dda090f3c10b803.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search},)}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      featchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLodiang ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
