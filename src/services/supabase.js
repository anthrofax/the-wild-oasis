import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://atkzebbcihfbeturprwu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0a3plYmJjaWhmYmV0dXJwcnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1OTEwNDYsImV4cCI6MjAyMDE2NzA0Nn0.qNpKuH19KP9nbfUouYxfPj1EAjAsL-QRXYEuMaZvHAg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
