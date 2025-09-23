import { FullProduct } from '@/app/types/fullProduct';
import { Product } from '@/app/types/product';

export function prepareProduct(
  product: FullProduct,
  category: string,
): Omit<Product, 'id' | 'year'> {
  return {
    itemId: product.id,
    capacity: product.capacity,
    category,
    color: product.color,
    fullPrice: product.priceRegular,
    image: product.images[0],
    name: product.name,
    price: product.priceDiscount,
    ram: product.ram,
    screen: product.screen,
    // screen: product.screen.split(' ').slice(0, 2).join(' '),
  };
}
