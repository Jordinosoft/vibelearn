import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wmajleiwcnskjucknvqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtYWpsZWl3Y25za2p1Y2tudnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyOTIwOTAsImV4cCI6MjA3OTg2ODA5MH0.ePf6M9iMPwKIcvPPxtgHz3gvECB4B_CxLJBzHxaLzsE"
);
