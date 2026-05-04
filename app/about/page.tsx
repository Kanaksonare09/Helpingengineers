"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Award, Zap, Heart, Shield, TrendingUp, Globe, ChevronRight, ShoppingBag } from "lucide-react"

const teamMembers = [
  {
    name: "Vijay Padiyar",
    role: "CEO & Founder",
    image: "/team/vijay_padiyar.jpg",
    bio: "Leading the vision of Helping Engineers to empower the next generation of innovators.",
  },
  {
    name: "Narayan Solanki",
    role: "Consultant",
    image: "/team/narayan_solanki.jpg",
    bio: "Providing expert guidance and strategic insights for academic and technical excellence.",
  },
]

const values = [
  {
    icon: Users,
    title: "Student-First",
    description: "Every decision we make prioritizes the needs and budgets of students.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Secure payments, verified products, and reliable delivery you can count on.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Built by students, for students, with feedback from our campus community.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Constantly improving our platform with the latest technology and features.",
  },
]

const stats = [
  { icon: Users, value: "50,000+", label: "Active Students" },
  { icon: ShoppingBag, value: "10,000+", label: "Products Listed" },
  { icon: Globe, value: "100+", label: "Campus Partners" },
  { icon: Award, value: "4.8/5", label: "Customer Rating" },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 px-6 py-2.5 bg-gradient-to-r from-[#2874F0] to-purple-600 text-white border-0 shadow-lg">
              <Target className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance leading-tight">
              <span className="text-[#2874F0]">Your Trusted Partner</span>
              <br />
              <span className="text-gray-900">For Electronics</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
              We started with a simple goal: provide quality electronics components to makers, hobbyists, and students 
              at competitive prices with fast delivery across India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2874F0] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#2874F0] mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Our <span className="text-[#2874F0]">Mission</span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We believe every student deserves access to quality products at prices they can afford. Our mission is
                  to make campus shopping easier, more affordable, and more convenient than ever before.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  From textbooks to tech, dorm essentials to daily necessities, we're here to support students
                  throughout their entire college journey with exclusive discounts, flexible payment options, and
                  lightning-fast delivery.
                </p>
                <Button asChild className="bg-[#2874F0] hover:bg-[#2366d1] text-white">
                  <Link href="/services">
                    Explore Our Services
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <Card className="overflow-hidden border-gray-200 shadow-xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                    alt="Students collaborating"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 bg-[#2874F0] text-white border-0">
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Our <span className="text-[#2874F0]">Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional services to support your academic and research endeavors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "📝",
                title: "Research Paper Writing",
                description: "Professional assistance with research papers, journals, and conference publications in IEEE, Springer, Elsevier formats.",
                features: ["Literature Review", "Technical Writing", "Citation Management"]
              },
              {
                icon: "💡",
                title: "Patent Filing",
                description: "Complete patent documentation and filing services for your innovative ideas and inventions.",
                features: ["Patent Drafting", "Prior Art Search", "Application Filing"]
              },
              {
                icon: "📚",
                title: "Project Documentation",
                description: "Comprehensive documentation for final year projects, dissertations, and thesis work.",
                features: ["Technical Reports", "User Manuals", "Project Guides"]
              },
              {
                icon: "🎓",
                title: "Academic Support",
                description: "End-to-end support for academic projects, from concept to implementation.",
                features: ["Project Guidance", "Consultation", "Review Services"]
              },
              {
                icon: "🔧",
                title: "Technical Consultation",
                description: "Expert consultation for IoT, robotics, and embedded systems projects.",
                features: ["Circuit Design", "Code Review", "Troubleshooting"]
              },
              {
                icon: "📊",
                title: "Presentation Services",
                description: "Professional presentation design for project vivas, seminars, and conferences.",
                features: ["PPT Design", "Poster Design", "Infographics"]
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#2874F0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2874F0]"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#2874F0] hover:bg-[#2366d1] text-white">
              <Link href="/services">
                View All Services
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Our <span className="text-[#2874F0]">Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className={`group border-gray-200 hover:border-[#2874F0]/30 transition-all duration-500 hover:scale-105 hover:shadow-xl bg-white ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Meet Our <span className="text-[#2874F0]">Team</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">The passionate students behind Helping Engineers</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`group overflow-hidden border-gray-200 hover:border-[#2874F0]/30 transition-all duration-500 hover:scale-105 hover:shadow-xl bg-white w-full sm:w-[calc(50%-1rem)] max-w-[320px] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-80 overflow-hidden bg-gray-50 border-b">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-sm text-[#2874F0] mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="border-gray-200 shadow-2xl max-w-4xl mx-auto bg-white">
            <div className="p-12 md:p-16 text-center">
              <Zap className="w-16 h-16 mx-auto mb-6 text-[#2874F0]" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Join Our Growing Community</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Be part of the electronics revolution. Start building your projects with quality components today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#2874F0] text-white hover:bg-[#2366d1] h-12 px-8"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-gray-300 bg-transparent h-12 px-8 text-gray-900 hover:bg-gray-100">
                  <Link href="/feedback">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
