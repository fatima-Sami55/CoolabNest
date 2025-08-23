"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Search, Filter, Users, Star, Clock, Code, GitBranch } from "lucide-react"

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack MERN application with payment integration and admin dashboard",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "active",
      progress: 75,
      members: 4,
      createdAt: "2024-01-15",
      lastActivity: "2 hours ago",
      isOwner: true,
      difficulty: "Advanced",
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Real-time collaborative task manager with drag-and-drop functionality",
      tech: ["React", "Socket.io", "Express", "PostgreSQL"],
      status: "active",
      progress: 45,
      members: 3,
      createdAt: "2024-02-01",
      lastActivity: "1 day ago",
      isOwner: false,
      difficulty: "Intermediate",
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Weather visualization with interactive charts and location-based forecasts",
      tech: ["React", "D3.js", "API Integration"],
      status: "completed",
      progress: 100,
      members: 2,
      createdAt: "2024-01-01",
      lastActivity: "1 week ago",
      isOwner: true,
      difficulty: "Beginner",
    },
    {
      id: 4,
      name: "Social Media Analytics",
      description: "Dashboard for analyzing social media metrics and engagement",
      tech: ["Vue.js", "Python", "FastAPI", "Chart.js"],
      status: "planning",
      progress: 10,
      members: 5,
      createdAt: "2024-02-10",
      lastActivity: "3 days ago",
      isOwner: false,
      difficulty: "Advanced",
    },
    {
      id: 5,
      name: "Recipe Sharing App",
      description: "Mobile-first app for sharing and discovering recipes",
      tech: ["React Native", "Firebase", "Node.js"],
      status: "active",
      progress: 60,
      members: 3,
      createdAt: "2024-01-20",
      lastActivity: "5 hours ago",
      isOwner: true,
      difficulty: "Intermediate",
    },
    {
      id: 6,
      name: "Learning Management System",
      description: "Platform for online courses with video streaming and quizzes",
      tech: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
      status: "active",
      progress: 30,
      members: 6,
      createdAt: "2024-02-05",
      lastActivity: "1 day ago",
      isOwner: false,
      difficulty: "Advanced",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 dark:text-green-400"
      case "Intermediate":
        return "text-yellow-600 dark:text-yellow-400"
      case "Advanced":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your projects and discover new collaboration opportunities
          </p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn-primary mt-4 sm:mt-0 inline-flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Create Project
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
            </select>
            <button className="btn-secondary inline-flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  {project.isOwner && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {project.members}
                </span>
                <span className={`flex items-center ${getDifficultyColor(project.difficulty)}`}>
                  <Code className="w-4 h-4 mr-1" />
                  {project.difficulty}
                </span>
              </div>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {project.lastActivity}
              </span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link to={`/projects/${project.id}`} className="flex-1 btn-primary text-center text-sm py-2">
                View Project
              </Link>
              <button className="btn-secondary px-3 py-2">
                <GitBranch className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search terms or filters</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setFilterStatus("all")
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Project</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
                <input type="text" className="input-field" placeholder="Enter project name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea className="input-field h-24 resize-none" placeholder="Describe your project"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies</label>
                <input type="text" className="input-field" placeholder="React, Node.js, MongoDB..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects
