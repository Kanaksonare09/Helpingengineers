"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery for orders above ₹500."
  },
  {
    question: "How long does delivery take?",
    answer: "We deliver within 2-5 business days across India. Metro cities get express delivery within 1-3 days."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for defective products. Items must be unused and in original packaging."
  },
  {
    question: "Do you provide technical support?",
    answer: "Yes! We offer free technical support via WhatsApp, email, and phone. Our experts are here to help with your projects."
  },
  {
    question: "Are products covered under warranty?",
    answer: "Most products come with manufacturer warranty ranging from 3-12 months. Check individual product pages for details."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes! For orders above ₹5000 or bulk purchases, contact us for special pricing and quotations."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-[#2874F0]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked <span className="text-[#2874F0]">Questions</span>
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our products and services
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4 mb-8">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 hover:border-[#2874F0] transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-gray-900 text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2874F0] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[#2874F0] to-[#1e5bb8] rounded-2xl p-8 text-center shadow-lg">
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Our support team is ready to help you with any queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-[#2874F0] hover:bg-gray-100 font-semibold"
              >
                <Link href="/feedback">Contact Support</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
