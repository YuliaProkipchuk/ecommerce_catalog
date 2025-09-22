import { api } from "@/app/libs/api";
import { Product } from "@/app/types/product";

export async function getPhones(): Promise<Product[]> {
    try {
        const result = await api.get<Product[]>('/tablets.json');
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
