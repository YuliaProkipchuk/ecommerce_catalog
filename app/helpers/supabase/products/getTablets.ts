import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const getTablets = async () => {
    const { data, error } = await supabase
        .from('tablets')
        .select('*')

    if (error) throw error
    return data
}