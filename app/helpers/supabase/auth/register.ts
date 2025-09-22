import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const registerUser = async (email:string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password
    })

    if (error) throw error
    return data
}