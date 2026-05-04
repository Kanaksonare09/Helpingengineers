// Hybrid authentication system
// Uses Supabase database when configured, falls back to localStorage
import { registerWithDB, loginWithDB, logoutFromDB, getCurrentUserFromDB, isAuthenticatedDB } from './auth-db'
import { isSupabaseConfigured } from './supabase'
import { sendWelcomeEmail, sendLoginNotification } from './email'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  created_at?: string
  createdAt?: string
}

export interface AuthData {
  email: string
  password: string
  name?: string
  phone?: string
}

const USERS_KEY = 'electronicsHub_users'
const CURRENT_USER_KEY = 'electronicsHub_currentUser'

// Get all users from localStorage
const getUsers = (): Record<string, User & { password: string }> => {
  if (typeof window === 'undefined') return {}
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : {}
}

// Save users to localStorage
const saveUsers = (users: Record<string, User & { password: string }>) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Hash password (simple for demo - in production use bcrypt on backend)
const hashPassword = (password: string): string => {
  return btoa(password) // Base64 encoding for demo only
}

// Verify password
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return btoa(password) === hashedPassword
}

// Register new user (uses database if configured, otherwise localStorage)
export const register = async (data: AuthData): Promise<{ success: boolean; message: string; user?: User }> => {
  // Try database first
  if (isSupabaseConfigured) {
    try {
      return await registerWithDB(data)
    } catch (error) {
      console.error('Database registration failed, falling back to localStorage:', error)
      // Fall through to localStorage
    }
  }

  // LocalStorage fallback
  return registerLocalStorage(data)
}

// LocalStorage registration (fallback)
const registerLocalStorage = (data: AuthData): { success: boolean; message: string; user?: User } => {
  try {
    const { email, password, name, phone } = data

    // Validate input
    if (!email || !password || !name || !phone) {
      return { success: false, message: 'All fields are required' }
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Invalid email address' }
    }

    // Check if user already exists
    const users = getUsers()
    if (users[email]) {
      return { 
        success: false, 
        message: 'Account already exists! This email is already registered. Please try logging in instead.' 
      }
    }

    // Create new user
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      createdAt: new Date().toISOString(),
    }

    users[email] = {
      ...user,
      password: hashPassword(password),
    }

    saveUsers(users)

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(email, name).catch(err => 
      console.error('Failed to send welcome email:', err)
    )

    return {
      success: true,
      message: 'Account created successfully! Welcome to Helping Engineers. Check your email for confirmation.',
      user,
    }
  } catch (error) {
    return { success: false, message: 'Registration failed. Please try again.' }
  }
}

// Login user (uses database if configured, otherwise localStorage)
export const login = async (email: string, password: string, remember: boolean = false): Promise<{ success: boolean; message: string; user?: User }> => {
  // Try database first
  if (isSupabaseConfigured) {
    try {
      return await loginWithDB({ email, password })
    } catch (error) {
      console.error('Database login failed, falling back to localStorage:', error)
      // Fall through to localStorage
    }
  }

  // LocalStorage fallback
  return loginLocalStorage(email, password, remember)
}

// LocalStorage login (fallback)
const loginLocalStorage = (email: string, password: string, remember: boolean = false): { success: boolean; message: string; user?: User } => {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' }
    }

    // Get users
    const users = getUsers()
    const user = users[email]

    if (!user) {
      return { 
        success: false, 
        message: 'No account found! This email is not registered. Please create an account first.' 
      }
    }

    // Verify password
    if (!verifyPassword(password, user.password)) {
      return { 
        success: false, 
        message: 'Invalid password! Please check your password and try again.' 
      }
    }

    // Set current user
    const { password: _, ...userWithoutPassword } = user
    
    if (remember) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    }

    // Send login notification email (async, don't wait)
    sendLoginNotification(email, user.name).catch(err => 
      console.error('Failed to send login notification:', err)
    )

    return {
      success: true,
      message: 'Logged in successfully! Welcome back to Helping Engineers.',
      user: userWithoutPassword,
    }
  } catch (error) {
    return { success: false, message: 'Login failed. Please try again.' }
  }
}

// Logout user
export const logout = async (): Promise<void> => {
  if (isSupabaseConfigured) {
    await logoutFromDB()
  } else {
    if (typeof window === 'undefined') return
    localStorage.removeItem(CURRENT_USER_KEY)
    sessionStorage.removeItem(CURRENT_USER_KEY)
  }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  if (isSupabaseConfigured) {
    return await getCurrentUserFromDB()
  }

  if (typeof window === 'undefined') return null
  
  const localUser = localStorage.getItem(CURRENT_USER_KEY)
  const sessionUser = sessionStorage.getItem(CURRENT_USER_KEY)
  
  const userStr = localUser || sessionUser
  return userStr ? JSON.parse(userStr) : null
}

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  if (isSupabaseConfigured) {
    return await isAuthenticatedDB()
  }

  const user = await getCurrentUser()
  return user !== null
}
