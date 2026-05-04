"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Search, User, CheckCircle2, Clock, Edit2, Trash2, X, Save } from "lucide-react"
import { getPublicQueries, deleteQuery, editQuery, isQueryOwner, type Query } from "@/lib/queries"
import { getCurrentUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const feedbackCategories = [
  "General Inquiry",
  "Product Question",
  "Order Issue",
  "Technical Support",
  "Partnership",
  "Other",
]

export function QASection() {
  const [queries, setQueries] = useState<Query[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ subject: "", message: "", category: "" })
  const { toast } = useToast()

  useEffect(() => {
    loadQueries()
    loadUser()
  }, [])

  const loadUser = async () => {
    const user = await getCurrentUser()
    setCurrentUser(user)
  }

  const loadQueries = () => {
    const allQueries = getPublicQueries()
    setQueries(allQueries)
  }

  const handleDelete = (queryId: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const success = deleteQuery(queryId)
      if (success) {
        toast({
          title: "Question Deleted",
          description: "Your question has been removed",
        })
        loadQueries()
      }
    }
  }

  const handleEditStart = (query: Query) => {
    setEditingId(query.id)
    setEditForm({
      subject: query.subject,
      message: query.message,
      category: query.category,
    })
  }

  const handleEditSave = (queryId: string) => {
    const success = editQuery(queryId, editForm)
    if (success) {
      toast({
        title: "Question Updated",
        description: "Your question has been updated successfully",
      })
      setEditingId(null)
      loadQueries()
    } else {
      toast({
        title: "Cannot Edit",
        description: "You cannot edit answered questions",
        variant: "destructive",
      })
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm({ subject: "", message: "", category: "" })
  }

  const canEditDelete = (query: Query) => {
    return currentUser && isQueryOwner(query.id, currentUser.email)
  }

  const filteredQueries = queries.filter(q => {
    const matchesSearch = searchTerm === "" || 
      q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.answer?.text.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(queries.map(q => q.category)))]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-[#2874F0]" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Customer <span className="text-[#2874F0]">Questions & Answers</span>
              </h2>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              Browse questions from other customers or ask your own
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search questions and answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-base bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-[#2874F0] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category === "all" ? "All Questions" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Ask Question CTA */}
          <Card className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-[#2874F0]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Have a question?</h3>
                <p className="text-gray-600">Ask our community and get answers from our experts</p>
              </div>
              <Button asChild className="bg-[#2874F0] hover:bg-[#1e5bb8]">
                <Link href="/feedback">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Question
                </Link>
              </Button>
            </div>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQueries.length === 0 ? (
              <Card className="p-12 text-center bg-white">
                <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">No questions found</p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm ? "Try a different search term" : "Be the first to ask a question!"}
                </p>
              </Card>
            ) : (
              filteredQueries.map((query) => (
                <Card key={query.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                  {/* Question */}
                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#2874F0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-900">{query.name}</span>
                            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                              {query.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(query.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          {/* Edit/Delete buttons for query owner */}
                          {canEditDelete(query) && (
                            <div className="flex gap-2">
                              {editingId !== query.id && (
                                <>
                                  {/* Edit button only for pending queries */}
                                  {query.status === "pending" && (
                                    <Button
                                      onClick={() => handleEditStart(query)}
                                      variant="outline"
                                      size="sm"
                                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </Button>
                                  )}
                                  {/* Delete button always available for owner */}
                                  <Button
                                    onClick={() => handleDelete(query.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {editingId === query.id ? (
                          /* Edit Form */
                          <div className="space-y-3 mt-3 bg-blue-50 p-4 rounded-lg">
                            <div>
                              <Label className="text-sm font-semibold text-gray-900">Category</Label>
                              <select
                                value={editForm.category}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                              >
                                {feedbackCategories.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-gray-900">Subject</Label>
                              <Input
                                value={editForm.subject}
                                onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                                className="mt-1 bg-white text-gray-900"
                              />
                            </div>
                            <div>
                              <Label className="text-sm font-semibold text-gray-900">Message</Label>
                              <Textarea
                                value={editForm.message}
                                onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                                className="mt-1 bg-white text-gray-900 min-h-[80px]"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleEditSave(query.id)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                              <Button
                                onClick={handleEditCancel}
                                size="sm"
                                variant="outline"
                              >
                                <X className="w-3 h-3 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          /* Display Question */
                          <>
                            {query.subject && (
                              <h4 className="font-semibold text-gray-900 mb-1">{query.subject}</h4>
                            )}
                            <p className="text-gray-700 leading-relaxed">{query.message}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Answer */}
                  {query.status === "answered" && query.answer ? (
                    <div className="ml-13 pl-6 border-l-4 border-green-400 bg-green-50 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">Answer from {query.answer.answeredBy}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(query.answer.answeredAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">{query.answer.text}</p>
                    </div>
                  ) : (
                    <div className="ml-13 pl-6 border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-yellow-900 font-medium">Waiting for answer...</span>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>

          {/* Bottom CTA */}
          {filteredQueries.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Didn't find what you're looking for?</p>
              <Button asChild size="lg" className="bg-[#2874F0] hover:bg-[#1e5bb8]">
                <Link href="/feedback">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Your Question
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
