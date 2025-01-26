import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zuyhxxleysvexxokhteo.supabase.co";
// anon key
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eWh4eGxleXN2ZXh4b2todGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODI4NjUsImV4cCI6MjA1MzQ1ODg2NX0.v4HRJl3q4jWB6GF05Op5FhT5XArBaaLlDQXLmor90xA";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
