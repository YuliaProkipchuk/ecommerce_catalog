import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const loginUser = async (email:string, password: string) => {
    const { data, error } = await supabase
        .auth.signInWithPassword({
            email: email,
            password: password
        })

    if (error) throw error
    return data
}