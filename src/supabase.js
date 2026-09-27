import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lugklawmqnbgfshovmnx.supabase.co";

const supabaseKey = "sb_publishable_PVy4JblszcKhco72QcrP4g_OxSMjY81";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);