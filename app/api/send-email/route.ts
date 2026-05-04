import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json()

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey || resendApiKey === 're_your_api_key_here') {
      console.log('📧 Email API: API key is missing or still using placeholder. Simulation mode.')
      return NextResponse.json({ 
        success: true, 
        message: 'Simulation Mode: Please add your actual RESEND_API_KEY to .env.local to receive real emails.' 
      })
    }

    const resend = new Resend(resendApiKey)
    const { data, error } = await resend.emails.send({
      from: 'Helping Engineers <onboarding@resend.dev>',
      to: to.toLowerCase(),
      subject,
      html,
    })

    if (error) {
      console.error('📧 Email API Error:', error)
      
      // If it's a validation error (e.g. unverified domain), still return success: true 
      // but with a warning so the checkout flow doesn't break.
      if ((error as any).statusCode === 403 || error.name === 'validation_error') {
        return NextResponse.json({ 
          success: true, 
          message: 'Order recorded, but notification email was blocked by Resend (Verify your domain to send to any email).' 
        })
      }

      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('📧 Email API Exception:', error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
