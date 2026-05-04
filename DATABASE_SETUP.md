# Database Setup Guide - ElectronicsHub

## 🗄️ Supabase Database Integration

This project now supports **proper database authentication** using Supabase with automatic fallback to localStorage if not configured.

---

## ✅ Quick Setup (5 minutes)

### Step 1: Create Free Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (free forever)
3. Create a new project:
   - **Name**: ElectronicsHub
   - **Database Password**: (save this!)
   - **Region**: Choose closest to your users
   - Wait 2 minutes for project setup

### Step 2: Get API Keys
1. In your Supabase project dashboard:
2. Click **Settings** (gear icon) → **API**
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### Step 3: Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and paste your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
   ```

### Step 4: Create Database Table
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query" and paste this:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

3. Click **Run** button
4. Done! 🎉

### Step 5: Restart Dev Server
```bash
pnpm dev
```

---

## 🎯 Features

### ✅ What's Working Now:

1. **Real Database Storage**
   - User accounts stored in Supabase PostgreSQL
   - Secure password hashing
   - Email verification support

2. **Automatic Fallback**
   - If database not configured → uses localStorage
   - No errors, works seamlessly

3. **Secure Authentication**
   - Industry-standard security
   - JWT tokens
   - Row Level Security (RLS)

4. **Features Included:**
   - ✅ User registration
   - ✅ Login/logout
   - ✅ Session persistence
   - ✅ Email verification (optional)
   - ✅ Password reset (ready to implement)

---

## 📝 How It Works

### Registration Flow:
```
User fills form → Check if Supabase configured → 
  ↓ YES: Save to database
  ↓ NO: Save to localStorage (fallback)
→ Success!
```

### Login Flow:
```
User enters credentials → Check if Supabase configured → 
  ↓ YES: Verify against database
  ↓ NO: Verify against localStorage
→ Return user data
```

---

## 🔒 Security Features

- **Password Hashing**: bcrypt-level security via Supabase Auth
- **JWT Tokens**: Automatic token management
- **Row Level Security**: Users can only access their own data
- **HTTPS Only**: All API calls encrypted
- **SQL Injection Protection**: Built-in by Supabase

---

## 🚀 Optional: Enable Email Verification

1. In Supabase dashboard → **Authentication** → **Settings**
2. Configure **Email Templates**
3. Enable **Email Confirmation**
4. Users will receive verification emails automatically!

---

## 📊 View Your Users

1. Go to Supabase dashboard
2. Click **Authentication** → **Users**
3. See all registered users in real-time!

---

## 🛠️ Troubleshooting

### "Database not configured" message
- Check `.env.local` file exists
- Verify environment variables are correct
- Restart dev server after adding `.env.local`

### Users not showing in Supabase
- Check SQL query ran successfully
- Verify table `users` exists in **Table Editor**
- Check browser console for errors

### Can't login
- Clear browser localStorage: `localStorage.clear()`
- Re-register with new account
- Check Supabase **Logs** for error details

---

## 🎓 Next Steps

Want to add more features?

1. **Password Reset**
   - Already supported by Supabase Auth
   - Just add UI for password reset flow

2. **Social Login**
   - Google, GitHub, etc.
   - Enable in Supabase **Authentication** → **Providers**

3. **User Profiles**
   - Add more fields to `users` table
   - Store shipping addresses, preferences, etc.

4. **Order History**
   - Create `orders` table
   - Link to user with foreign key

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [SQL Tutorial](https://supabase.com/docs/guides/database)

---

## 💡 Notes

- **Free Tier Limits**: 
  - 500MB database
  - 50,000 monthly active users
  - 2GB file storage
  - Unlimited API requests

- **No Credit Card Required** for free tier!

- **Can upgrade later** if you need more resources

---

**That's it!** Your authentication system is now database-backed and production-ready! 🚀
