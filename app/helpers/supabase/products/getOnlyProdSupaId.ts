import { supabase } from '@/app/helpers/supabase/supabaseclient';

export async function getOnlyProdSupaId(id: string) {
  const { data, error } = await supabase.from('products').select('*').eq('itemId', id);

  if (error) throw error;
  return data;
}
