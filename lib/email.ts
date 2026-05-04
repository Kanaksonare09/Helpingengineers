import { Resend } from 'resend'

// Initialize Resend (get API key from https://resend.com)
const resendApiKey = process.env.RESEND_API_KEY
const isEmailConfigured = Boolean(resendApiKey)

const resend = isEmailConfigured && resendApiKey ? new Resend(resendApiKey) : null

interface EmailData {
  to: string
  subject: string
  html: string
}

// Send email using our API route
export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error('📧 Email Client Error:', error)
    return { success: false, message: error.message || 'Failed to send email' }
  }
}

// Welcome email template
export const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #FF9900; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Helping Engineers!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            <p>Thank you for creating an account with Helping Engineers. We're excited to have you join our community of makers and electronics enthusiasts!</p>
            
            <p><strong>What you can do now:</strong></p>
            <ul>
              <li>Browse thousands of electronics components</li>
              <li>Get exclusive discounts and offers</li>
              <li>Track your orders in real-time</li>
              <li>Access technical support from our experts</li>
            </ul>

            <a href="https://your-domain.com/products" class="button">Start Shopping →</a>

            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Happy building! 🔧</p>
            <p><strong>Team Helping Engineers</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Helping Engineers. All rights reserved.</p>
            <p>Campus Plaza, University Ave</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject: '🎉 Welcome to Helping Engineers - Account Created Successfully!',
    html,
  })
}

// Login notification email
export const sendLoginNotification = async (email: string, name: string): Promise<void> => {
  const now = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; border-left: 4px solid #2874F0; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Login Notification</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}!</h2>
            <p>We detected a login to your Helping Engineers account.</p>
            
            <div class="info-box">
              <strong>Login Details:</strong><br>
              📅 Time: ${now}<br>
              🌍 Location: India<br>
              💻 Device: Web Browser
            </div>

            <p><strong>Was this you?</strong></p>
            <p>If you recognize this activity, you can safely ignore this email.</p>
            
            <p>If you didn't log in, please secure your account immediately by changing your password.</p>
            
            <p>Stay safe! 🔒</p>
            <p><strong>Team Helping Engineers</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Helping Engineers. All rights reserved.</p>
            <p>This is an automated security notification.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject: '🔐 Login Alert - Helping Engineers Account',
    html,
  })
}

// Send query notification to admin
export const sendQueryNotification = async (queryData: {
  name: string
  email: string
  phone?: string
  category: string
  message: string
}): Promise<{ success: boolean; message: string }> => {
  const now = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .query-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #2874F0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2874F0; display: block; margin-bottom: 5px; }
          .value { color: #333; padding: 8px; background: #f7f9fc; border-radius: 4px; }
          .message-box { background: #fff3cd; border-left: 4px solid #FF9900; padding: 15px; margin: 15px 0; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .badge { display: inline-block; background: #FF9900; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📨 New Query Received</h1>
            <p style="margin: 0; opacity: 0.9;">Helping Engineers Customer Query</p>
          </div>
          <div class="content">
            <div class="query-box">
              <div style="text-align: right; margin-bottom: 15px;">
                <span class="badge">${queryData.category}</span>
              </div>
              
              <div class="field">
                <span class="label">👤 Customer Name:</span>
                <div class="value">${queryData.name}</div>
              </div>

              <div class="field">
                <span class="label">📧 Email Address:</span>
                <div class="value"><a href="mailto:${queryData.email}" style="color: #2874F0; text-decoration: none;">${queryData.email}</a></div>
              </div>

              ${queryData.phone ? `
              <div class="field">
                <span class="label">📱 Phone Number:</span>
                <div class="value"><a href="tel:${queryData.phone}" style="color: #2874F0; text-decoration: none;">${queryData.phone}</a></div>
              </div>
              ` : ''}

              <div class="field">
                <span class="label">🕐 Query Time:</span>
                <div class="value">${now}</div>
              </div>

              <div class="message-box">
                <strong>💬 Query Message:</strong>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${queryData.message}</p>
              </div>
            </div>

            <div style="text-center: center; margin-top: 25px; padding: 20px; background: white; border-radius: 8px;">
              <p style="margin: 0 0 15px 0; color: #666;">📌 Important: This is just a notification.</p>
              <p style="margin: 0 0 15px 0; color: #333; font-weight: bold;">Answer this query on the website admin panel:</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/queries" style="display: inline-block; background: #2874F0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 5px;">
                🌐 Go to Admin Panel
              </a>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">
                Your answer will be visible to all customers on the website
              </p>
            </div>

            <p style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px; font-size: 14px;">
              <strong>⚠️ Do not reply to this email.</strong> All responses must be posted on the website admin panel so customers can see them.
            </p>
          </div>
          <div class="footer">
            <p>© 2026 Helping Engineers Admin Notification System</p>
            <p>This email was sent to Helpingengineers24@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `

  return await sendEmail({
    to: 'helpingengineers24@gmail.com',
    subject: `🔔 New ${queryData.category} Query - Answer on Website`,
    html,
  })
}

// Send query confirmation to customer
export const sendQueryConfirmation = async (
  email: string, 
  name: string, 
  category: string
): Promise<void> => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-box { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .button { display: inline-block; background: #2874F0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Query Received Successfully</h1>
          </div>
          <div class="content">
            <h2>Hello ${name}! 👋</h2>
            
            <div class="success-box">
              <strong>✓ Your query has been received!</strong><br>
              Category: <strong>${category}</strong>
            </div>

            <p>Thank you for contacting Helping Engineers. Our support team has received your query and will respond within <strong>24 hours</strong>.</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our expert team will review your query</li>
              <li>You'll receive a detailed response via email</li>
              <li>For urgent matters, feel free to call us at +91 7470578495</li>
            </ul>

            <p><strong>Need immediate help?</strong></p>
            <p>WhatsApp us: <a href="https://wa.me/917470578495" style="color: #25D366; text-decoration: none; font-weight: bold;">+91 7470578495</a></p>

            <a href="mailto:Helpingengineers24@gmail.com" class="button">Contact Support</a>

            <p>Best regards,<br><strong>Team Helping Engineers</strong></p>
          </div>
          <div class="footer">
            <p>© 2026 Helping Engineers. All rights reserved.</p>
            <p>Helpingengineers24@gmail.com | +91 7470578495</p>
          </div>
        </div>
      </body>
    </html>
  `

  await sendEmail({
    to: email,
    subject: `✅ Query Received - We'll respond within 24 hours`,
    html,
  })
}

// Send order notification to admin
export const sendOrderNotification = async (orderData: {
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: any[]
  total: number
}): Promise<{ success: boolean; message: string }> => {
  const now = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  const itemsHtml = orderData.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('')

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2874F0 0%, #1e5bb8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f7f9fc; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border: 2px solid #2874F0; shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2874F0; }
          .value { color: #333; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #f1f5f9; padding: 10px; text-align: left; color: #2874F0; }
          .total-row { font-weight: bold; font-size: 18px; color: #2874F0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ New Order Received!</h1>
            <p style="margin: 0; opacity: 0.9;">Helping Engineers Order Notification</p>
          </div>
          <div class="content">
            <div class="order-box">
              <h2 style="margin-top: 0; color: #2874F0;">Customer Details</h2>
              <div class="field"><span class="label">Name:</span> <span class="value">${orderData.customerName}</span></div>
              <div class="field"><span class="label">Email:</span> <span class="value">${orderData.customerEmail}</span></div>
              <div class="field"><span class="label">Phone:</span> <span class="value">${orderData.customerPhone || 'Not provided'}</span></div>
              <div class="field"><span class="label">Time:</span> <span class="value">${now}</span></div>

              <h2 style="margin-top: 20px; color: #2874F0;">Order Items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="3" style="padding: 20px 10px 10px; text-align: right;">Total Amount:</td>
                    <td style="padding: 20px 10px 10px; text-align: right;">₹${orderData.total.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="text-align: center; margin-top: 25px;">
              <p>Please process this order as soon as possible.</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" style="display: inline-block; background: #2874F0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Admin Dashboard
              </a>
            </div>
          </div>
          <div class="footer">
            <p>© 2026 Helping Engineers Admin Notification System</p>
          </div>
        </div>
      </body>
    </html>
  `

  return await sendEmail({
    to: 'helpingengineers24@gmail.com',
    subject: `🛍️ New Order Received - ₹${orderData.total.toLocaleString()}`,
    html,
  })
}
