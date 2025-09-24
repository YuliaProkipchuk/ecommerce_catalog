import { SortBy } from "@/app/stores/slices/productSlice";
import { Product } from "@/app/types/product";

export function prepareData(data:Product[], category:string, sortBy:SortBy, searchQuery:string) {
  return data
    .filter((product) => product.category === category && product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .toSorted((p1, p2) => {
      const key = sortBy.param;
      const order = sortBy.order;
      const res = (p1[key] as number) - (p2[key] as number);
      return order === 'asc' ? res : res * -1;
    });
}
