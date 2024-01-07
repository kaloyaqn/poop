import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabase = createClient('https://zyuebxkjnotchjumbrqq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dWVieGtqbm90Y2hqdW1icnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNzI1OTcsImV4cCI6MjAxOTg0ODU5N30.uljUag2sAZ1kEBuf8exQodk_Vy_q0sNO-FLgTPTKmFA', {
  db: { schema: 'public' }
})

// const handleUpdated = (payload) => {
//   console.log('Changes recieved', payload)
// }

// supabase
//   .channel('products')
//   .on('postgres_changes', {event: "UPDATE", schema: 'public', table:'products'}, handleUpdated)
//   .subscribe();