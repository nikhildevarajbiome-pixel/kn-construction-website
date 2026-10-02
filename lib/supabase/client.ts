import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

/** Browser client. Uses only the public anon key. */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
