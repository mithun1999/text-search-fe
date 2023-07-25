export const supabaseConfig = {
  supabaseUrl:
    (import.meta.env.VITE_SUPABASE_URL as string) ||
    "https://wiiffqrxlylhjwtznymy.supabase.co",
  supabaseKey:
    (import.meta.env.VITE_SUPABASE_KEY as string) ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpaWZmcXJ4bHlsaGp3dHpueW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg2OTMxODEsImV4cCI6MTk5NDI2OTE4MX0.gorbYeKGlKL3cYj21uSPGVXKInDt_u7vI-doPZU2SBY",
};
