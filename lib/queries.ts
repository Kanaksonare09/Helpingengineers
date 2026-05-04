// Query Management System - Like Flipkart/Amazon Q&A

export interface Query {
  id: string
  name: string
  email: string
  phone?: string
  category: string
  subject: string
  message: string
  timestamp: number
  status: "pending" | "answered"
  answer?: {
    text: string
    answeredBy: string
    answeredAt: number
  }
  isPublic: boolean
}

// Get all queries from localStorage
export const getAllQueries = (): Query[] => {
  if (typeof window === "undefined") return []
  const queries = localStorage.getItem("electronicsHub_queries")
  return queries ? JSON.parse(queries) : []
}

// Get public queries (visible to customers)
export const getPublicQueries = (): Query[] => {
  return getAllQueries().filter(q => q.isPublic)
}

// Get pending queries (admin view)
export const getPendingQueries = (): Query[] => {
  return getAllQueries().filter(q => q.status === "pending")
}

// Add new query
export const addQuery = (queryData: Omit<Query, "id" | "timestamp" | "status" | "isPublic">): Query => {
  const newQuery: Query = {
    ...queryData,
    id: Date.now().toString(),
    timestamp: Date.now(),
    status: "pending",
    isPublic: true, // Make public by default
  }

  const queries = getAllQueries()
  queries.unshift(newQuery) // Add to beginning
  localStorage.setItem("electronicsHub_queries", JSON.stringify(queries))
  
  return newQuery
}

// Answer a query (admin function)
export const answerQuery = (queryId: string, answerText: string, answeredBy: string): boolean => {
  const queries = getAllQueries()
  const queryIndex = queries.findIndex(q => q.id === queryId)
  
  if (queryIndex === -1) return false
  
  queries[queryIndex].status = "answered"
  queries[queryIndex].answer = {
    text: answerText,
    answeredBy,
    answeredAt: Date.now(),
  }
  
  localStorage.setItem("electronicsHub_queries", JSON.stringify(queries))
  return true
}

// Delete a query (admin function)
export const deleteQuery = (queryId: string): boolean => {
  const queries = getAllQueries()
  const filtered = queries.filter(q => q.id !== queryId)
  
  if (filtered.length === queries.length) return false
  
  localStorage.setItem("electronicsHub_queries", JSON.stringify(filtered))
  return true
}

// Toggle query visibility
export const toggleQueryVisibility = (queryId: string): boolean => {
  const queries = getAllQueries()
  const queryIndex = queries.findIndex(q => q.id === queryId)
  
  if (queryIndex === -1) return false
  
  queries[queryIndex].isPublic = !queries[queryIndex].isPublic
  localStorage.setItem("electronicsHub_queries", JSON.stringify(queries))
  return true
}

// Edit a query (only if not answered)
export const editQuery = (
  queryId: string, 
  updates: { subject?: string; message?: string; category?: string }
): boolean => {
  const queries = getAllQueries()
  const queryIndex = queries.findIndex(q => q.id === queryId)
  
  if (queryIndex === -1 || queries[queryIndex].status === "answered") return false
  
  if (updates.subject !== undefined) queries[queryIndex].subject = updates.subject
  if (updates.message !== undefined) queries[queryIndex].message = updates.message
  if (updates.category !== undefined) queries[queryIndex].category = updates.category
  
  localStorage.setItem("electronicsHub_queries", JSON.stringify(queries))
  return true
}

// Edit an answer (admin only)
export const editAnswer = (queryId: string, newAnswerText: string): boolean => {
  const queries = getAllQueries()
  const queryIndex = queries.findIndex(q => q.id === queryId)
  
  if (queryIndex === -1 || queries[queryIndex].status !== "answered" || !queries[queryIndex].answer) {
    return false
  }
  
  queries[queryIndex].answer!.text = newAnswerText
  queries[queryIndex].answer!.answeredAt = Date.now()
  
  localStorage.setItem("electronicsHub_queries", JSON.stringify(queries))
  return true
}

// Check if user owns a query
export const isQueryOwner = (queryId: string, userEmail: string): boolean => {
  const queries = getAllQueries()
  const query = queries.find(q => q.id === queryId)
  return query?.email === userEmail
}

// Search queries
export const searchQueries = (searchTerm: string): Query[] => {
  const queries = getPublicQueries()
  const term = searchTerm.toLowerCase()
  
  return queries.filter(q => 
    q.subject.toLowerCase().includes(term) ||
    q.message.toLowerCase().includes(term) ||
    q.category.toLowerCase().includes(term) ||
    (q.answer?.text.toLowerCase().includes(term))
  )
}

// Get queries by category
export const getQueriesByCategory = (category: string): Query[] => {
  return getPublicQueries().filter(q => q.category === category)
}
