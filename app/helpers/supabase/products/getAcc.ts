import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const getAcc = async () => {
    const { data, error } = await supabase
        .from('accessories')
        .select('*')

    if (error) throw error
    return data
}