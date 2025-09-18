import { ProductCard } from '../ProductCard/ProductCard';
import classes from './Layout.module.scss';

export function Layout() {
  return (
      <div className={classes.layout}>
        {new Array(10).fill(0).map((_, i) => (
          <div className="card_layout" key={i}>
            <ProductCard />
          </div>
        ))}
      </div>
  );
}
