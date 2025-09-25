import {supabase} from "@/app/helpers/supabase/supabaseclient";

export const registerUser = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: name
      }
    }
  });

  if (error) throw error;
  return data;
};