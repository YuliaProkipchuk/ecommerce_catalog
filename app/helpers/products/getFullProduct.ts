import { api } from "@/app/libs/api";
import { FullProduct } from "@/app/types/fullProduct";

export async function getFullProducts(category: string): Promise<FullProduct[]> {
    try {
        const result = await api.get<FullProduct[]>(`/${category}.json`);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
