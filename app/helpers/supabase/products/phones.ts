import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const getPhones = async () => {
    const { data, error } = await supabase
        .from('phones')
        .select('*')

    if (error) throw error
    return data
}