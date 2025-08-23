"use client"

import { useState } from "react"
import {
  BookOpen,
  Video,
  FileText,
  LinkIcon,
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  ExternalLink,
  Calendar,
  Tag,
} from "lucide-react"

const Resources = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    "Frontend",
    "Backend",
    "Full Stack",
    "Mobile",
    "DevOps",
    "Data Science",
    "UI/UX",
    "Algorithms",
    "Career",
    "Tools",
  ]

  const resources = [
    {
      id: 1,
      title: "Complete React Developer Course 2024",
      description:
        "Comprehensive guide to learning React from basics to advanced concepts including hooks, context, and testing.",
      type: "video",
      category: "Frontend",
      url: "https://example.com/react-course",
      author: "Sarah Wilson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-02-10",
      likes: 45,
      comments: 12,
      bookmarks: 23,
      tags: ["React", "JavaScript", "Hooks", "Testing"],
    },
    {
      id: 2,
      title: "Node.js Best Practices Guide",
      description:
        "A comprehensive collection of best practices for Node.js development, covering security, performance, and code organization.",
      type: "article",
      category: "Backend",
      url: "https://example.com/nodejs-guide",
      author: "Mike Johnson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-02-08",
      likes: 67,
      comments: 18,
      bookmarks: 34,
      tags: ["Node.js", "Best Practices", "Security", "Performance"],
    },
    {
      id: 3,
      title: "System Design Interview Preparation",
      description: "Essential system design concepts and patterns for technical interviews at top tech companies.",
      type: "document",
      category: "Career",
      url: "https://example.com/system-design",
      author: "Alex Chen",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-02-05",
      likes: 89,
      comments: 25,
      bookmarks: 56,
      tags: ["System Design", "Interviews", "Architecture", "Scalability"],
    },
    {
      id: 4,
      title: "Figma to Code: Design System Implementation",
      description:
        "Learn how to translate Figma designs into reusable React components and maintain design consistency.",
      type: "video",
      category: "UI/UX",
      url: "https://example.com/figma-to-code",
      author: "Emily Davis",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-02-03",
      likes: 34,
      comments: 8,
      bookmarks: 19,
      tags: ["Figma", "Design Systems", "React", "UI/UX"],
    },
    {
      id: 5,
      title: "Docker Containerization for Beginners",
      description:
        "Step-by-step guide to containerizing applications with Docker, including best practices and deployment strategies.",
      type: "article",
      category: "DevOps",
      url: "https://example.com/docker-guide",
      author: "David Kim",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-02-01",
      likes: 52,
      comments: 15,
      bookmarks: 28,
      tags: ["Docker", "Containerization", "DevOps", "Deployment"],
    },
    {
      id: 6,
      title: "Machine Learning with Python Cheat Sheet",
      description:
        "Quick reference guide for common ML algorithms, libraries, and techniques using Python and scikit-learn.",
      type: "document",
      category: "Data Science",
      url: "https://example.com/ml-cheatsheet",
      author: "James Wilson",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-01-28",
      likes: 78,
      comments: 22,
      bookmarks: 45,
      tags: ["Machine Learning", "Python", "Scikit-learn", "Algorithms"],
    },
  ]

  const tabs = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "video", label: "Videos", icon: Video },
    { id: "article", label: "Articles", icon: FileText },
    { id: "document", label: "Documents", icon: FileText },
    { id: "link", label: "Links", icon: LinkIcon },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesTab = activeTab === "all" || resource.type === activeTab
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesTab && matchesSearch && matchesCategory
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5 text-red-500" />
      case "article":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "document":
        return <FileText className="w-5 h-5 text-green-500" />
      case "link":
        return <LinkIcon className="w-5 h-5 text-purple-500" />
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Resource Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover and share learning resources, tutorials, and tools
          </p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 inline-flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Share Resource
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button className="btn-secondary inline-flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="space-y-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{getTypeIcon(resource.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{resource.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={resource.authorAvatar || "/placeholder.svg"}
                          alt={resource.author}
                          className="w-4 h-4 rounded-full"
                        />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{resource.createdAt}</span>
                      </div>
                      <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm inline-flex items-center ml-4"
                  >
                    View
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{resource.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{resource.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-yellow-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>{resource.bookmarks}</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search terms or filters</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setActiveTab("all")
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Resources
