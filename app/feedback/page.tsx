"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, Clock, HeadphonesIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { sendQueryNotification } from "@/lib/email"
import { addQuery } from "@/lib/queries"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Helpingengineers24@gmail.com",
    link: "mailto:Helpingengineers24@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+91 7470578495",
    link: "tel:+917470578495",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Campus Plaza, University Ave",
    link: "#",
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "Mon-Fri: 9AM - 6PM",
    link: "#",
  },
]

const feedbackCategories = [
  "General Inquiry",
  "Product Question",
  "Order Issue",
  "Technical Support",
  "Partnership",
  "Other",
]

export default function FeedbackPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(feedbackCategories[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      
      // Save query to website (localStorage) - This always works
      const newQuery = addQuery({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        category: selectedCategory,
        subject: formData.subject,
        message: formData.message,
      })

      // Try to send notification email to admin (optional, don't fail if it doesn't work)
      try {
        const emailResult = await sendQueryNotification({
          name: fullName,
          email: formData.email,
          phone: formData.phone,
          category: selectedCategory,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        })
        
        if (emailResult.success) {
          console.log("✅ Admin notification email sent successfully")
        } else {
          console.log("⚠️ Email notification failed, but query saved:", emailResult.message)
        }
      } catch (emailError) {
        // Email failed, but that's OK - query is still saved
        console.log("⚠️ Email notification error (query still saved):", emailError)
      }
      
      // Always show success since query is saved
      toast({
        title: "✅ Question Posted Successfully!",
        description: "Your question is now visible. We'll answer it soon on the website.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setSelectedCategory(feedbackCategories[0])
      
      // Redirect to Q&A page after 2 seconds
      setTimeout(() => {
        window.location.href = "/#qa"
      }, 2000)
    } catch (error) {
      console.error("Error submitting query:", error)
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-4 px-4 py-2 bg-[#2874F0] text-white border-0">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              <span className="text-[#2874F0]">We're Here to Help</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Have a question, suggestion, or need assistance? Our support team is ready to help you with
              anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <a
                  key={index}
                  href={method.link}
                  className={`block transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="group border-gray-200 hover:border-[#2874F0]/30 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full bg-white">
                    <div className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-base mb-2 text-black">{method.title}</h3>
                      <p className="text-sm text-gray-700 break-words">{method.description}</p>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <Card className="border-gray-200 shadow-xl bg-white">
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-black">Send Us a Message</h2>
                  <p className="text-gray-700">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black">First Name *</Label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="h-11 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-black">Last Name</Label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="h-11 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="maker@email.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-black">Category *</Label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#2874F0]"
                      required
                    >
                      {feedbackCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-black">Subject</Label>
                    <Input 
                      id="subject" 
                      type="text" 
                      placeholder="How can we help you?" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-black">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] resize-none bg-white border-gray-200 text-black placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#2874F0] hover:bg-[#2366d1] text-white transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* FAQ Section */}
              <Card className="border-gray-200 shadow-lg bg-white">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#2874F0] flex items-center justify-center">
                      <HeadphonesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-black">Quick Support</h3>
                      <p className="text-sm text-gray-700">Common questions answered</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        question: "How long does delivery take?",
                        answer: "Campus orders are typically delivered within 24-48 hours.",
                      },
                      {
                        question: "What payment methods do you accept?",
                        answer: "We accept all major cards, UPI, and offer EMI options.",
                      },
                      {
                        question: "How do I verify my student status?",
                        answer: "Use your .edu email address during registration.",
                      },
                    ].map((faq, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium text-sm mb-1 text-black">{faq.question}</h4>
                        <p className="text-xs text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Response Time Card */}
              <Card className="border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[#2874F0]" />
                  <h3 className="font-semibold text-lg mb-2 text-black">Fast Response Time</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    We typically respond to all inquiries within 2-4 hours during business hours.
                  </p>
                  <Badge className="text-xs bg-[#2874F0] text-white border-0">
                    Average response: 2 hours
                  </Badge>
                </div>
              </Card>

              {/* Location Map Card */}
              <Card className="border-gray-200 shadow-lg overflow-hidden bg-white">
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
                    alt="Campus location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end">
                    <div className="p-4">
                      <p className="text-sm font-medium text-black">Campus Plaza</p>
                      <p className="text-xs text-gray-700">University Avenue, Main Campus</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
