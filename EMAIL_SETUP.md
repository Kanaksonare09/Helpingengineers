# Email Notifications Setup - ElectronicsHub

## 📧 Send Email Notifications (Optional but Recommended)

Users will receive beautiful email notifications for:
- ✅ **Account Creation** - Welcome email
- 🔐 **Login Alerts** - Security notification

---

## Quick Setup (3 minutes) - FREE

### Option 1: Resend (Recommended - 100 emails/day free)

#### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up with GitHub or email (FREE forever)
3. Verify your email

#### Step 2: Get API Key
1. In Resend dashboard, click **API Keys**
2. Click **Create API Key**
3. Name it: `ElectronicsHub Production`
4. Copy the API key (starts with `re_...`)

#### Step 3: Add to Environment Variables
1. Open `.env.local` file
2. Add this line:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Save file

#### Step 4: Restart Server
```bash
pnpm dev
```

**Done!** Emails will now be sent automatically! 🎉

---

### Step 5: Configure Your Domain (Optional)

By default, emails are sent from `onboarding@resend.dev`. To use your own domain:

1. In Resend dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain: `yourdomain.com`
4. Add DNS records (TXT, MX, CNAME) shown by Resend
5. Wait 5-10 minutes for verification
6. Update `lib/email.ts`:
   ```typescript
   from: 'ElectronicsHub <noreply@yourdomain.com>',
   ```

---

## 📝 What Happens

### Registration Email:
```
Subject: 🎉 Welcome to ElectronicsHub - Account Created Successfully!

- Welcome message
- Account benefits
- Call-to-action button
- Professional branding
```

### Login Email:
```
Subject: 🔐 Login Alert - ElectronicsHub Account

- Login timestamp
- Location info
- Security warning
- Professional branding
```

---

## 🎨 Email Templates

Beautiful HTML emails with:
- ✅ Responsive design
- ✅ Professional branding (ElectronicsHub colors)
- ✅ Mobile-friendly
- ✅ Security information
- ✅ Call-to-action buttons

---

## 🔧 Testing Emails

### Test Registration Email:
1. Create a new account with your real email
2. Check inbox (or spam folder)
3. Should receive welcome email within seconds!

### Test Login Email:
1. Log in with existing account
2. Check inbox
3. Should receive login notification!

---

## 🚀 Free Tier Limits

**Resend FREE plan includes:**
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ No credit card required
- ✅ All features included
- ✅ API access
- ✅ Email tracking

**Upgrade only if you need:**
- More than 100 emails/day
- Custom analytics
- Priority support

---

## 🛠️ Troubleshooting

### "Email not configured" in console
- Add `RESEND_API_KEY` to `.env.local`
- Restart dev server
- Emails work without showing errors to users

### Emails not arriving
1. Check spam folder
2. Verify API key is correct
3. Check Resend dashboard → **Logs** for delivery status
4. Make sure `.env.local` file exists and is not `.env.local.example`

### Email shows wrong domain
- Update `from:` field in `lib/email.ts`
- Must be either:
  - `onboarding@resend.dev` (free)
  - Your verified domain

---

## 📊 View Email Logs

1. Go to Resend dashboard
2. Click **Logs**
3. See all sent emails with:
   - Delivery status
   - Open rates
   - Click rates
   - Bounce info

---

## 🎯 Alternative: No Email Service

If you don't want to set up emails:
- System still works perfectly!
- Users just won't receive email notifications
- Console will show: "Email not configured"
- No errors shown to users

---

## 💡 Pro Tips

1. **Add Your Logo**: Update email templates in `lib/email.ts`
2. **Custom Colors**: Change gradient colors to match brand
3. **More Templates**: Add password reset, order confirmation, etc.
4. **Tracking**: Enable open/click tracking in Resend
5. **A/B Testing**: Test different email designs

---

## 📚 Resources

- [Resend Docs](https://resend.com/docs)
- [Email Best Practices](https://resend.com/docs/best-practices)
- [Domain Setup Guide](https://resend.com/docs/send-with-domains)

---

**That's it!** Your users will love the professional email notifications! 📧✨
