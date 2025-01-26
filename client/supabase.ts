import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zuyhxxleysvexxokhteo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1eWh4eGxleXN2ZXh4b2todGVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzg3ODU2OSwiZXhwIjoyMDUzNDU0NTY5fQ.dpgskPGNz06pr9QCMZ9Uk8iul7tvijfIYeiTBkkmZAM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
