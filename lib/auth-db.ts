// Database-backed authentication using Supabase
import { supabase, isSupabaseConfigured, type User, type AuthResponse } from './supabase'
import { sendWelcomeEmail, sendLoginNotification } from './email'

const CURRENT_USER_KEY = 'electronicsHub_currentUser'

// Register new user with Supabase
export const registerWithDB = async (data: {
  email: string
  password: string
  name: string
  phone?: string
}): Promise<AuthResponse> => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, message: 'Database not configured. Using local storage fallback.' }
  }

  try {
    // Validate input
    if (!data.email || !data.password) {
      return { success: false, message: '⚠️ Email and password are required' }
    }

    if (data.password.length < 6) {
      return { success: false, message: '⚠️ Password must be at least 6 characters long' }
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          phone: data.phone || '',
        }
      }
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        return { success: false, message: '⚠️ Account already exists! This email is already registered. Please try logging in instead.' }
      }
      return { success: false, message: authError.message }
    }

    if (!authData.user) {
      return { success: false, message: 'Failed to create account' }
    }

    // Create user profile
    const user: User = {
      id: authData.user.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      created_at: new Date().toISOString()
    }

    // Store user profile in database
    const { error: profileError } = await supabase
      .from('users')
      .insert([{
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone
      }])

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Continue anyway as auth was successful
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(user.email, user.name).catch(err => 
      console.error('Failed to send welcome email:', err)
    )

    return {
      success: true,
      message: '✅ Account created successfully! Welcome to Helping Engineers. Check your email for confirmation.',
      user
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to create account'
    }
  }
}

// Login with Supabase
export const loginWithDB = async (data: {
  email: string
  password: string
}): Promise<AuthResponse> => {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, message: 'Database not configured. Using local storage fallback.' }
  }

  try {
    // Validate input
    if (!data.email || !data.password) {
      return { success: false, message: 'Email and password are required' }
    }

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (authError) {
      if (authError.message.includes('Invalid login')) {
        return { success: false, message: 'No account found! This email is not registered. Please create an account first.' }
      }
      return { success: false, message: 'Invalid credentials! Please check your email and password.' }
    }

    if (!authData.user) {
      return { success: false, message: 'Login failed' }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    const user: User = {
      id: authData.user.id,
      email: authData.user.email!,
      name: profile?.name || authData.user.user_metadata?.name || 'User',
      phone: profile?.phone || authData.user.user_metadata?.phone,
      created_at: authData.user.created_at
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }

    // Send login notification email (async, don't wait)
    sendLoginNotification(user.email, user.name).catch(err => 
      console.error('Failed to send login notification:', err)
    )

    return {
      success: true,
      message: 'Logged in successfully! Welcome back to Helping Engineers.',
      user
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to login'
    }
  }
}

// Logout
export const logoutFromDB = async (): Promise<void> => {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut()
  }
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Get current user
export const getCurrentUserFromDB = async (): Promise<User | null> => {
  // Try localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  }

  // Check Supabase session
  if (isSupabaseConfigured && supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      const currentUser: User = {
        id: user.id,
        email: user.email!,
        name: profile?.name || user.user_metadata?.name || 'User',
        phone: profile?.phone || user.user_metadata?.phone,
        created_at: user.created_at
      }

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
      }

      return currentUser
    }
  }

  return null
}

// Check if user is authenticated
export const isAuthenticatedDB = async (): Promise<boolean> => {
  const user = await getCurrentUserFromDB()
  return user !== null
}
