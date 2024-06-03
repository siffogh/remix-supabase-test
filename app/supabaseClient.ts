import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    ENV: { [key: string]: string };
  }
}

const isServer = typeof window === "undefined";

const createSupabase = () => {
  console.debug("isServer", isServer);
  if (isServer) {
    //Server environment will use service key
    return createClient(
      process.env.PUBLIC_SUPABASE_PROJECT_URL || "",
      process.env.SECRET_SUPABASE_KEY || ""
    );
  }

  //Browser environment will use anon key
  return createClient(
    window.ENV.PUBLIC_SUPABASE_PROJECT_URL,
    window.ENV.PUBLIC_SUPABASE_ANON_KEY
  );
};

const supabaseClient = createSupabase();

export default supabaseClient;
