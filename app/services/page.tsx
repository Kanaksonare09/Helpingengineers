"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Lightbulb, 
  BookOpen, 
  Award, 
  Code, 
  Presentation,
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: FileText,
    title: "Research Paper Writing",
    description: "Professional academic and technical research paper writing services for conferences and journals.",
    features: [
      "IEEE, Springer, Elsevier format papers",
      "Literature review and analysis",
      "Technical writing and documentation",
      "Plagiarism-free original content",
      "Abstract and conclusion writing",
      "Citation and reference management"
    ],
    tags: ["Academic", "Technical", "Publishing"]
  },
  {
    icon: Lightbulb,
    title: "Patent Filing & Documentation",
    description: "Comprehensive patent filing services including documentation, prior art search, and application submission.",
    features: [
      "Patent drafting and filing",
      "Prior art search and analysis",
      "Provisional and complete specifications",
      "Patent claim writing",
      "Technical drawings and diagrams",
      "International patent applications"
    ],
    tags: ["IP Rights", "Innovation", "Legal"]
  },
  {
    icon: BookOpen,
    title: "Technical Documentation",
    description: "Detailed technical documentation for projects, products, and research work.",
    features: [
      "User manuals and guides",
      "API and software documentation",
      "Hardware design documentation",
      "System architecture documents",
      "Standard Operating Procedures",
      "White papers and case studies"
    ],
    tags: ["Documentation", "Technical Writing"]
  },
  {
    icon: Code,
    title: "Project Development",
    description: "End-to-end project development services for IoT, robotics, and embedded systems.",
    features: [
      "IoT solutions and automation",
      "Robotics and mechatronics projects",
      "Embedded systems design",
      "PCB design and prototyping",
      "Firmware and software development",
      "System integration and testing"
    ],
    tags: ["Development", "IoT", "Robotics"]
  },
  {
    icon: Presentation,
    title: "Consultation & Training",
    description: "Expert consultation and training services for academic and industrial projects.",
    features: [
      "Project guidance and mentoring",
      "Technical workshops and seminars",
      "One-on-one consultation sessions",
      "Career guidance in electronics",
      "Research methodology training",
      "Industry best practices"
    ],
    tags: ["Education", "Mentoring", "Training"]
  },
  {
    icon: Award,
    title: "Academic Support",
    description: "Comprehensive academic support for students and researchers in engineering domains.",
    features: [
      "Final year project assistance",
      "Thesis and dissertation support",
      "Conference paper submission",
      "Research proposal writing",
      "Presentation preparation",
      "Journal selection guidance"
    ],
    tags: ["Academic", "Research", "Support"]
  }
]

const serviceProcess = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Discuss your requirements, objectives, and timeline for the project or service."
  },
  {
    step: "2",
    title: "Proposal & Planning",
    description: "Receive a detailed proposal with scope, deliverables, timeline, and pricing."
  },
  {
    step: "3",
    title: "Execution",
    description: "Our expert team works on your project with regular updates and quality checks."
  },
  {
    step: "4",
    title: "Review & Revision",
    description: "Review the deliverables and request revisions to ensure complete satisfaction."
  },
  {
    step: "5",
    title: "Final Delivery",
    description: "Receive final deliverables with documentation and post-delivery support."
  }
]

const whyChooseUs = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced professionals with academic and industry expertise"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous quality checks and plagiarism-free original work"
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Successfully delivered 100+ projects and publications"
  },
  {
    icon: FileText,
    title: "Timely Delivery",
    description: "Committed to meeting deadlines without compromising quality"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            Professional Services
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From research papers to patent filing, we provide comprehensive services to support your academic and professional endeavors in electronics and engineering.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Our Process */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We follow a systematic approach to ensure quality and timely delivery of all services
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {serviceProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                      {process.step}
                    </div>
                    <CardTitle className="text-lg mb-2">{process.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {process.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
                {index < serviceProcess.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-8 w-6 h-6 text-muted-foreground transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to delivering excellence in every project we undertake
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardHeader className="pb-8 pt-12">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg max-w-2xl mx-auto">
                Contact us today to discuss your project requirements and get a customized quote. We're here to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/feedback">
                    Contact Us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
