"use client"

import { useAuth } from "../contexts/AuthContext"
import { FolderOpen, MessageCircle, Users, Award, Plus, ArrowRight, Clock, Star } from "lucide-react"

const Dashboard = () => {
  const { user } = useAuth()

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce App",
      description: "React + Node.js shopping platform",
      members: 4,
      progress: 75,
      lastActivity: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Task Manager",
      description: "Productivity app with real-time sync",
      members: 3,
      progress: 45,
      lastActivity: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Weather visualization with charts",
      members: 2,
      progress: 90,
      lastActivity: "3 days ago",
      status: "review",
    },
  ]

  const upcomingTasks = [
    { id: 1, title: "Complete user authentication", project: "E-commerce App", due: "Today" },
    { id: 2, title: "Design product catalog", project: "E-commerce App", due: "Tomorrow" },
    { id: 3, title: "Implement drag & drop", project: "Task Manager", due: "This week" },
  ]

  const stats = [
    { label: "Active Projects", value: "3", icon: FolderOpen, color: "text-blue-600" },
    { label: "Team Members", value: "12", icon: Users, color: "text-green-600" },
    { label: "Messages", value: "47", icon: MessageCircle, color: "text-purple-600" },
    { label: "XP Points", value: user?.xp || "1,250", icon: Award, color: "text-yellow-600" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}! 👋</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
              <button className="btn-primary text-sm inline-flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.members} members
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.lastActivity}
                      </span>
                    </div>
                    <span>{project.progress}% complete</span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>

                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                    View Project
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Tasks</h2>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{task.project}</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Due: {task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Badges */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Badges</h2>
            <div className="space-y-3">
              {user?.badges?.slice(0, 3).map((badge, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Create Project</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Find Teammates</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-gray-900 dark:text-white">Join Chat</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
