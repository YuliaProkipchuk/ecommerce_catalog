import { Product } from '@/app/types/product';

export function sortProductsForCarousel(sortBy?: keyof Product) {
  return (p1: Product, p2: Product) => {
    switch (sortBy) {
      case 'year': {
        return p2.year - p1.year;
      }
      case 'price': {
        return p2.price - p2.price;
      }
      default:
        return 0;
    }
  };
}
