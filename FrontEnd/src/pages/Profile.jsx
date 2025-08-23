"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Mail, School, Github, Linkedin, MapPin, Calendar, Edit, Plus, X } from "lucide-react"

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState(user?.skills || ["React", "Node.js", "MongoDB", "JavaScript", "Python"])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack MERN application with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Completed",
      members: 4,
    },
    {
      id: 2,
      name: "Task Management App",
      description: "Real-time collaborative task manager",
      tech: ["React", "Socket.io", "Express"],
      status: "In Progress",
      members: 3,
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "Weather visualization with interactive charts",
      tech: ["React", "D3.js", "API Integration"],
      status: "Completed",
      members: 2,
    },
  ]

  const badges = [
    { name: "First Project", description: "Completed your first project", icon: "🚀" },
    { name: "Team Player", description: "Collaborated on 5+ projects", icon: "🤝" },
    { name: "Code Reviewer", description: "Reviewed 20+ pull requests", icon: "👀" },
    { name: "Mentor", description: "Helped 10+ students", icon: "🎓" },
    { name: "Early Adopter", description: "One of the first 100 users", icon: "⭐" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={user?.profilePicture || "/placeholder.svg?height=120&width=120&query=user profile"}
              alt={user?.userName}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.userName || "John Doe"}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Full-Stack Developer & Student</p>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className="btn-primary mt-4 sm:mt-0">
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {user?.email || "john@example.com"}
              </div>
              <div className="flex items-center">
                <School className="w-4 h-4 mr-2" />
                {user?.school || "University of Technology"}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Joined March 2024
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* XP and Level */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience Points</span>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{user?.xp || 1250} XP</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">250 XP to next level</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
            {isEditing ? (
              <textarea
                className="input-field h-32 resize-none"
                placeholder="Tell us about yourself, your interests, and what you're working on..."
                defaultValue="Passionate full-stack developer with a love for creating innovative web applications. Currently studying Computer Science and always eager to collaborate on exciting projects. I enjoy working with modern technologies and helping fellow students learn and grow."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Passionate full-stack developer with a love for creating innovative web applications. Currently studying
                Computer Science and always eager to collaborate on exciting projects. I enjoy working with modern
                technologies and helping fellow students learn and grow.
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="ml-2 text-primary-600 hover:text-primary-800">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="input-field flex-1"
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button onClick={addSkill} className="btn-primary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Projects */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.members} team members</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Badges & Achievements</h2>
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{badge.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Projects Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Collaborations</span>
                <span className="font-semibold text-gray-900 dark:text-white">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Code Reviews</span>
                <span className="font-semibold text-gray-900 dark:text-white">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Mentoring Hours</span>
                <span className="font-semibold text-gray-900 dark:text-white">32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
