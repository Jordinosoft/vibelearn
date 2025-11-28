import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE!
// );
export const supabase = createClient(
  "https://wmajleiwcnskjucknvqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYWpsZWl3Y25za2p1Y2tudnFoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI5MjA5MCwiZXhwIjoyMDc5ODY4MDkwfQ.gD3_N3Vm8elhxjfpHye9mPiUJGOFceKMjlwPPm_10Pw"
);
