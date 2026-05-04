"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
  MessageCircle, 
  Send, 
  Trash2, 
  Eye, 
  EyeOff, 
  Clock,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Filter,
  Edit2,
  Save,
  X
} from "lucide-react"
import { getAllQueries, answerQuery, deleteQuery, toggleQueryVisibility, editAnswer, type Query } from "@/lib/queries"
import { getCurrentUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function AdminQueriesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [queries, setQueries] = useState<Query[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "answered">("all")
  const [answeringId, setAnsweringId] = useState<string | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null)
  const [editAnswerText, setEditAnswerText] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    loadQueries()
  }

  const loadQueries = () => {
    const allQueries = getAllQueries()
    setQueries(allQueries)
  }

  const handleAnswer = (queryId: string) => {
    if (!answerText.trim()) {
      toast({
        title: "Answer required",
        description: "Please enter an answer",
        variant: "destructive",
      })
      return
    }

    const success = answerQuery(queryId, answerText, user?.name || "Admin")
    if (success) {
      toast({
        title: "Answer Posted",
        description: "Your answer is now visible to all customers",
      })
      setAnswerText("")
      setAnsweringId(null)
      loadQueries()
    }
  }

  const handleDelete = (queryId: string) => {
    if (confirm("Are you sure you want to delete this query?")) {
      const success = deleteQuery(queryId)
      if (success) {
        toast({
          title: "Query Deleted",
          description: "The query has been removed",
        })
        loadQueries()
      }
    }
  }

  const handleToggleVisibility = (queryId: string) => {
    const success = toggleQueryVisibility(queryId)
    if (success) {
      toast({
        title: "Visibility Updated",
        description: "Query visibility has been changed",
      })
      loadQueries()
    }
  }

  const handleEditAnswer = (query: Query) => {
    setEditingAnswerId(query.id)
    setEditAnswerText(query.answer?.text || "")
  }

  const handleSaveEditedAnswer = (queryId: string) => {
    if (!editAnswerText.trim()) {
      toast({
        title: "Answer required",
        description: "Please enter an answer",
        variant: "destructive",
      })
      return
    }

    const success = editAnswer(queryId, editAnswerText)
    if (success) {
      toast({
        title: "Answer Updated",
        description: "Your answer has been updated successfully",
      })
      setEditAnswerText("")
      setEditingAnswerId(null)
      loadQueries()
    }
  }

  const handleCancelEditAnswer = () => {
    setEditingAnswerId(null)
    setEditAnswerText("")
  }

  const filteredQueries = queries.filter(q => {
    if (filter === "pending") return q.status === "pending"
    if (filter === "answered") return q.status === "answered"
    return true
  })

  const pendingCount = queries.filter(q => q.status === "pending").length
  const answeredCount = queries.filter(q => q.status === "answered").length

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center pt-20">
        <div className="text-gray-900">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Queries Management</h1>
            <p className="text-gray-600">Answer customer questions that will be visible to everyone</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 bg-white border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Queries</p>
                  <p className="text-3xl font-bold text-gray-900">{queries.length}</p>
                </div>
                <MessageCircle className="w-12 h-12 text-[#2874F0] opacity-20" />
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
                </div>
                <Clock className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </Card>

            <Card className="p-6 bg-white border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Answered</p>
                  <p className="text-3xl font-bold text-green-600">{answeredCount}</p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Filter */}
          <Card className="p-4 mb-6 bg-white border-0 shadow-lg">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === "all"
                      ? "bg-[#2874F0] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All ({queries.length})
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === "pending"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilter("answered")}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === "answered"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Answered ({answeredCount})
                </button>
              </div>
            </div>
          </Card>

          {/* Queries List */}
          <div className="space-y-4">
            {filteredQueries.length === 0 ? (
              <Card className="p-12 text-center bg-white">
                <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">No queries found</p>
              </Card>
            ) : (
              filteredQueries.map((query) => (
                <Card key={query.id} className="p-6 bg-white border-0 shadow-lg">
                  {/* Query Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        query.status === "pending" 
                          ? "bg-orange-100 text-orange-700" 
                          : "bg-green-100 text-green-700"
                      } border-0`}>
                        {query.status === "pending" ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {query.status}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        {query.category}
                      </Badge>
                      {!query.isPublic && (
                        <Badge className="bg-gray-100 text-gray-700 border-0">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Hidden
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleToggleVisibility(query.id)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                      >
                        {query.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={() => handleDelete(query.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-900">{query.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        <a href={`mailto:${query.email}`} className="text-[#2874F0] hover:underline">
                          {query.email}
                        </a>
                      </div>
                      {query.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <a href={`tel:${query.phone}`} className="text-[#2874F0] hover:underline">
                            {query.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(query.timestamp).toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-4">
                    {query.subject && (
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{query.subject}</h3>
                    )}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{query.message}</p>
                  </div>

                  {/* Answer Section */}
                  {query.status === "answered" && query.answer ? (
                    editingAnswerId === query.id ? (
                      /* Edit Answer Form */
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Edit your answer..."
                          value={editAnswerText}
                          onChange={(e) => setEditAnswerText(e.target.value)}
                          className="min-h-[100px] text-gray-900"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleSaveEditedAnswer(query.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleCancelEditAnswer}
                            variant="outline"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Display Answer */
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-900">Your Answer</span>
                            <span className="text-xs text-gray-600">
                              {new Date(query.answer.answeredAt).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <Button
                            onClick={() => handleEditAnswer(query)}
                            variant="outline"
                            size="sm"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit2 className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <p className="text-gray-800 leading-relaxed">{query.answer.text}</p>
                      </div>
                    )
                  ) : answeringId === query.id ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Type your answer here... This will be visible to all customers."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        className="min-h-[100px] text-gray-900"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAnswer(query.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post Answer
                        </Button>
                        <Button
                          onClick={() => {
                            setAnsweringId(null)
                            setAnswerText("")
                          }}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setAnsweringId(query.id)}
                      className="bg-[#2874F0] hover:bg-[#1e5bb8] text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Answer This Query
                    </Button>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
