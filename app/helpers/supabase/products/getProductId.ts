import {supabase} from "@/app/helpers/supabase/supabaseclient";

export async function getProductsSupaId(id:string | number, table: string) {
    const { data, error } = await supabase
        .from(table)
        .select('*').eq('id', id)

    if (error) throw error
    return data
}
