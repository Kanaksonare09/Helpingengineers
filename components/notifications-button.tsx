"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your MacBook Pro has been shipped",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Flash Sale",
    description: "50% off on all headphones - 2 hours left!",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Price Drop Alert",
    description: "iPhone 15 Pro is now ₹5000 cheaper",
    time: "3h ago",
    unread: false,
  },
]

export function NotificationsButton() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-all hover:scale-110 text-black">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FF9F00] text-white text-[10px] font-bold border-0">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white border-gray-200">
        <DropdownMenuLabel className="text-black font-bold text-base">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50 focus:bg-gray-50">
            <div className="flex items-start justify-between w-full mb-1">
              <span className="font-semibold text-sm text-black">{notification.title}</span>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-700">{notification.description}</p>
            {notification.unread && <div className="w-2 h-2 bg-[#2874F0] rounded-full mt-2"></div>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-gray-200" />
        <DropdownMenuItem className="text-center text-[#2874F0] cursor-pointer hover:bg-gray-50 focus:bg-gray-50 font-semibold">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
