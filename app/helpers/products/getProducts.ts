import { api } from "@/app/libs/api";
import { Product } from "@/app/types/product";

export async function getProducts(): Promise<Product[]> {
    try {
        const result = await api.get<Product[]>('/products.json');
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
