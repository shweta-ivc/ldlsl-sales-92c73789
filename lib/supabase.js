import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Public client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Service client for server-side operations (has full access)
export const getServiceClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

// Helper to get authenticated user
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Helper to sign out user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return error
}