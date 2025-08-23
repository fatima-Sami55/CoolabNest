"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Users,
  Calendar,
  Star,
  Settings,
  Plus,
  MessageCircle,
  FileText,
  GitBranch,
  CheckCircle,
  Circle,
  Clock,
  User,
} from "lucide-react"

const ProjectDetail = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock project data
  const project = {
    id: 1,
    name: "E-commerce Platform",
    description:
      "A full-stack MERN application with payment integration, user authentication, product catalog, shopping cart, and admin dashboard. This project aims to create a modern, responsive e-commerce solution for small to medium businesses.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Tailwind CSS"],
    status: "active",
    progress: 75,
    members: [
      { id: 1, name: "John Doe", role: "Project Lead", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 2, name: "Jane Smith", role: "Frontend Dev", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 3, name: "Mike Johnson", role: "Backend Dev", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 4, name: "Sarah Wilson", role: "UI/UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    createdAt: "2024-01-15",
    deadline: "2024-03-15",
    isOwner: true,
    difficulty: "Advanced",
    repository: "https://github.com/team/ecommerce-platform",
  }

  const tasks = [
    {
      id: 1,
      title: "Setup user authentication system",
      status: "completed",
      assignee: "Mike Johnson",
      dueDate: "2024-02-01",
    },
    { id: 2, title: "Design product catalog UI", status: "completed", assignee: "Sarah Wilson", dueDate: "2024-02-05" },
    {
      id: 3,
      title: "Implement shopping cart functionality",
      status: "in-progress",
      assignee: "Jane Smith",
      dueDate: "2024-02-15",
    },
    {
      id: 4,
      title: "Integrate Stripe payment system",
      status: "in-progress",
      assignee: "Mike Johnson",
      dueDate: "2024-02-20",
    },
    { id: 5, title: "Build admin dashboard", status: "todo", assignee: "John Doe", dueDate: "2024-02-25" },
    { id: 6, title: "Implement order management", status: "todo", assignee: "Jane Smith", dueDate: "2024-03-01" },
    { id: 7, title: "Add product reviews system", status: "todo", assignee: "Sarah Wilson", dueDate: "2024-03-05" },
    { id: 8, title: "Testing and bug fixes", status: "todo", assignee: "Team", dueDate: "2024-03-10" },
  ]

  const recentActivity = [
    { id: 1, user: "Jane Smith", action: "completed task", target: "Product catalog UI", time: "2 hours ago" },
    { id: 2, user: "Mike Johnson", action: "pushed code to", target: "authentication branch", time: "4 hours ago" },
    { id: 3, user: "Sarah Wilson", action: "uploaded design", target: "Shopping cart mockups", time: "1 day ago" },
    { id: 4, user: "John Doe", action: "created task", target: "Admin dashboard", time: "2 days ago" },
  ]

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "tasks", label: "Tasks" },
    { id: "files", label: "Files" },
    { id: "activity", label: "Activity" },
  ]

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link
          to="/projects"
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
        </div>
        {project.isOwner && (
          <button className="btn-secondary inline-flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        )}
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.progress}%</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Members</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{project.members.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tasks.filter((t) => t.status === "completed").length}/{tasks.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Days Left</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Description */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Tasks</h2>
                <button className="btn-primary text-sm inline-flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    {getTaskStatusIcon(task.status)}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>Assigned to: {task.assignee}</span>
                        <span>Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTaskStatusColor(task.status)}`}>
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "files" && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Files</h2>
                <button className="btn-primary text-sm inline-flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload File
                </button>
              </div>
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No files uploaded yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Upload documents, designs, or other project files</p>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Project Activity</h2>
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Members */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team Members</h2>
            <div className="space-y-3">
              {project.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <img src={member.avatar || "/placeholder.svg"} alt={member.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 btn-secondary text-sm">Invite Members</button>
          </div>

          {/* Project Info */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{project.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deadline</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full btn-primary text-sm inline-flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Team Chat
              </button>
              <button className="w-full btn-secondary text-sm inline-flex items-center justify-center">
                <GitBranch className="w-4 h-4 mr-2" />
                View Repository
              </button>
              <button className="w-full btn-secondary text-sm inline-flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
