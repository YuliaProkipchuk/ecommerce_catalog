import {supabase} from "@/app/helpers/supabase/supabaseclient";

export async function getProductsSupa() {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) throw error
    return data
}
