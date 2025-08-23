"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Search, Hash, Settings, Plus } from "lucide-react"

const Chat = () => {
  const { user } = useAuth()
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)

  const channels = [
    { id: "general", name: "general", type: "channel", unread: 0 },
    { id: "random", name: "random", type: "channel", unread: 2 },
    { id: "project-ecommerce", name: "project-ecommerce", type: "channel", unread: 5 },
    { id: "project-taskmanager", name: "project-taskmanager", type: "channel", unread: 0 },
    { id: "help", name: "help", type: "channel", unread: 1 },
  ]

  const directMessages = [
    { id: "dm-jane", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", online: true, unread: 3 },
    { id: "dm-mike", name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", online: true, unread: 0 },
    { id: "dm-sarah", name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32", online: false, unread: 1 },
  ]

  const mockMessages = [
    {
      id: 1,
      user: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Hey everyone! Just pushed the latest changes to the authentication branch 🚀",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      user: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Great work! I'll review the PR this afternoon",
      timestamp: "10:32 AM",
      isOwn: false,
    },
    {
      id: 3,
      user: user?.name || "You",
      avatar: user?.avatar || "/placeholder.svg?height=32&width=32",
      message: "Thanks! Let me know if you need any clarification on the implementation",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 4,
      user: "Sarah Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "I've updated the design mockups based on our discussion yesterday. Check them out in Figma!",
      timestamp: "11:15 AM",
      isOwn: false,
    },
    {
      id: 5,
      user: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Perfect timing! I was just about to start working on the frontend components",
      timestamp: "11:18 AM",
      isOwn: false,
    },
  ]

  useEffect(() => {
    setMessages(mockMessages)
  }, [selectedChannel])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: user?.name || "You",
        avatar: user?.avatar || "/placeholder.svg?height=32&width=32",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const getChannelInfo = () => {
    const channel = channels.find((c) => c.id === selectedChannel)
    const dm = directMessages.find((d) => d.id === selectedChannel)

    if (channel) {
      return {
        name: `#${channel.name}`,
        subtitle: `${Math.floor(Math.random() * 50) + 10} members`,
        avatar: null,
      }
    } else if (dm) {
      return {
        name: dm.name,
        subtitle: dm.online ? "Online" : "Offline",
        avatar: dm.avatar,
      }
    }
    return { name: "#general", subtitle: "25 members", avatar: null }
  }

  const channelInfo = getChannelInfo()

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">CollabNest Chat</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Team Communication</p>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Channels
              </h2>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm ${
                    selectedChannel === channel.id
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-2" />
                    <span>{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Direct Messages
              </h2>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => setSelectedChannel(dm.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-sm ${
                    selectedChannel === dm.id
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <img src={dm.avatar || "/placeholder.svg"} alt={dm.name} className="w-4 h-4 rounded-full" />
                      {dm.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <span>{dm.name}</span>
                  </div>
                  {dm.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                      {dm.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || "/placeholder.svg?height=32&width=32&query=user"}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.userName || "John Doe"}</p>
              <p className="text-xs text-green-600 dark:text-green-400">Online</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {channelInfo.avatar ? (
                <img
                  src={channelInfo.avatar || "/placeholder.svg"}
                  alt={channelInfo.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <Hash className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{channelInfo.name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{channelInfo.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex space-x-3 ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
              <img
                src={msg.avatar || "/placeholder.svg"}
                alt={msg.user}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{msg.user}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${channelInfo.name}`}
                className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Member List (for channels) */}
      {selectedChannel.startsWith("project-") && (
        <div className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {directMessages.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="w-8 h-8 rounded-full" />
                    {member.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
