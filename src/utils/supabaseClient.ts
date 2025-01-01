import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseClient = (): SupabaseClient => {
	
	
	

	if (
		!process.env.NEXT_PUBLIC_SUPABASE_URL ||
		!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	) {
		throw new Error(
			"Supabase URL or Anon Key is not set in environment variables"
		);
	}

	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	);

	return supabase;
};
