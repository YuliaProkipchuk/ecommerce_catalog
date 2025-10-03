'use client';
import { Layout } from '@/app/components/ui/Layout/Layout';
import classes from './Catalog.module.scss';
import { FilterControls } from '@/app/components/ui/FilterControls/FilterControls';
import { useAppDispatch, useAppSelector } from '@/app/stores/hooks';
import {
  getCategoryProducts,
  getProductsStore,
  selectTotalByCategory,
  setCategory,
} from '@/app/stores/slices/productSlice';
import { useEffect } from 'react';
import { Pagination } from '@/app/components/ui/Pagination/Pagination';
import Loader from '@/app/components/ui/Loader/Loader';

const categories = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};
type CategoryKey = keyof typeof categories;
type Props = {
  category: string;
};
export const CatalogPage = ({ category }: Props) => {
  const id = category as CategoryKey;
  const { products, countItemsPage, sortBy, searchQuery, loading } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTotalByCategory(id));

  useEffect(() => {
    dispatch(setCategory(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getProductsStore())
      .unwrap()
      .then(() => {
        dispatch(getCategoryProducts(id));
      });
  }, [countItemsPage, sortBy, searchQuery, id, dispatch]);

  return (
    <>
      <section className="section">
        <h1 className={`main-heading`}>{categories[id]}</h1>
        <span className={classes.info}>{data.length} models</span>
      </section>
      <section className="section">
        <FilterControls />
        {loading && <Loader />}
        {!loading && <Layout products={products} />}
        <Pagination category={id} />
      </section>
    </>
  );
};
