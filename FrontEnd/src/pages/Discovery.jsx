"use client"

import { useState } from "react"
import { Search, MapPin, Star, Users, Code, MessageCircle, Plus, School } from "lucide-react"

const Discovery = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])
  const [filterLocation, setFilterLocation] = useState("")
  const [filterExperience, setFilterExperience] = useState("all")

  const skills = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "Vue.js",
    "Angular",
    "Express",
    "Django",
    "Flask",
    "Java",
    "C++",
    "Go",
    "Rust",
    "Docker",
    "AWS",
    "Firebase",
    "GraphQL",
  ]

  const developers = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Full-stack developer passionate about building scalable web applications",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      school: "MIT",
      location: "Boston, MA",
      experience: "Intermediate",
      projects: 8,
      rating: 4.8,
      isOnline: true,
      lookingFor: "Frontend projects",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "UI/UX designer and frontend developer with a love for clean, intuitive interfaces",
      skills: ["React", "Vue.js", "Figma", "JavaScript"],
      school: "Stanford University",
      location: "San Francisco, CA",
      experience: "Advanced",
      projects: 12,
      rating: 4.9,
      isOnline: false,
      lookingFor: "Design-focused projects",
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Backend enthusiast specializing in microservices and cloud architecture",
      skills: ["Python", "Django", "PostgreSQL", "AWS"],
      school: "UC Berkeley",
      location: "San Francisco, CA",
      experience: "Advanced",
      projects: 15,
      rating: 4.7,
      isOnline: true,
      lookingFor: "Backend challenges",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Mobile app developer and CS student interested in cross-platform solutions",
      skills: ["React Native", "Flutter", "Firebase", "JavaScript"],
      school: "Georgia Tech",
      location: "Atlanta, GA",
      experience: "Intermediate",
      projects: 6,
      rating: 4.6,
      isOnline: true,
      lookingFor: "Mobile projects",
    },
    {
      id: 5,
      name: "James Wilson",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Data science student with experience in machine learning and web development",
      skills: ["Python", "React", "TensorFlow", "PostgreSQL"],
      school: "Carnegie Mellon",
      location: "Pittsburgh, PA",
      experience: "Beginner",
      projects: 4,
      rating: 4.5,
      isOnline: false,
      lookingFor: "ML/AI projects",
    },
    {
      id: 6,
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Full-stack developer with a passion for open source and collaborative coding",
      skills: ["JavaScript", "Node.js", "React", "MongoDB"],
      school: "University of Washington",
      location: "Seattle, WA",
      experience: "Intermediate",
      projects: 9,
      rating: 4.8,
      isOnline: true,
      lookingFor: "Open source projects",
    },
  ]

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const filteredDevelopers = developers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.some((skill) => dev.skills.includes(skill))

    const matchesLocation = !filterLocation || dev.location.toLowerCase().includes(filterLocation.toLowerCase())

    const matchesExperience = filterExperience === "all" || dev.experience === filterExperience

    return matchesSearch && matchesSkills && matchesLocation && matchesExperience
  })

  const getExperienceColor = (experience) => {
    switch (experience) {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Teammates</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find and connect with fellow student developers who share your interests and skills
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, skills, or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Location (e.g., San Francisco, CA)"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="input-field"
              />
            </div>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="input-field"
            >
              <option value="all">All Experience Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Skills Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-500"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {selectedSkills.length > 0 && (
              <button
                onClick={() => setSelectedSkills([])}
                className="text-sm text-primary-600 hover:text-primary-700 mt-2"
              >
                Clear all skills
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevelopers.map((developer) => (
          <div key={developer.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <img
                  src={developer.avatar || "/placeholder.svg"}
                  alt={developer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {developer.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{developer.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <School className="w-4 h-4" />
                  <span>{developer.school}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{developer.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{developer.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {developer.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded"
                >
                  {skill}
                </span>
              ))}
              {developer.skills.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  +{developer.skills.length - 4}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Code className="w-4 h-4 mr-1" />
                  {developer.projects} projects
                </span>
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {developer.rating}
                </span>
              </div>
              <span className={`font-medium ${getExperienceColor(developer.experience)}`}>{developer.experience}</span>
            </div>

            {/* Looking For */}
            <div className="mb-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">Looking for:</span>
              <p className="text-sm text-gray-900 dark:text-white font-medium">{developer.lookingFor}</p>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 btn-primary text-sm py-2 inline-flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                Connect
              </button>
              <button className="btn-secondary px-3 py-2">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDevelopers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No developers found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedSkills([])
              setFilterLocation("")
              setFilterExperience("all")
            }}
            className="btn-secondary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Discovery
