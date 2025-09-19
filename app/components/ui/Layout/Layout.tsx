import { Product } from '@/app/types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import classes from './Layout.module.scss';
type Props = {
  products?: Product[];
};
export function Layout({products}:Props) {
  if(!products) return;
  return (
    <div className={classes.layout}>
      {products.map((product) => (
        <div className="card_layout" key={product.id}>
          <ProductCard product={product}/>
        </div>
      ))}
    </div>
  );
}
