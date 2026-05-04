import { User } from './auth'

export interface OrderItem {
  name: string
  price: number
  quantity: number
  image: string
  folder: string
  category: string
}

export interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: OrderItem[]
  total: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  createdAt: string
}

const ORDERS_KEY = 'electronicsHub_orders'

export const saveOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
  const orders = getOrders()
  
  const newOrder: Order = {
    ...orderData,
    id: `ORD${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }
  
  orders.push(newOrder)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  return newOrder
}

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return []
  const orders = localStorage.getItem(ORDERS_KEY)
  return orders ? JSON.parse(orders) : []
}

export const getUserOrders = (userId: string): Order[] => {
  return getOrders().filter(order => order.userId === userId)
}

export const getAllOrders = (): Order[] => {
  return getOrders()
}
