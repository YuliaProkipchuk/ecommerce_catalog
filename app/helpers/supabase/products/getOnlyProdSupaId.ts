import {supabase} from "@/app/helpers/supabase/supabaseclient";

export async function getOnlyProdSupaId(id:number) {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) throw error
    return data
}
