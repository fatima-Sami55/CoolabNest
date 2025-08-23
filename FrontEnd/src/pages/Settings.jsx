"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import {
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  School,
  Github,
  Linkedin,
  X,
  Plus,
} from "lucide-react"

const Settings = () => {
  const { user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [skills, setSkills] = useState(user?.skills || ["React", "Node.js", "MongoDB"])
  const [newSkill, setNewSkill] = useState("")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>

                <form className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <img
                      src={user?.avatar || "/placeholder.svg?height=80&width=80&query=profile"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <button className="btn-primary text-sm">Change Photo</button>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input type="text" defaultValue={user?.userName || "John Doe"} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          defaultValue={user?.email || "john@example.com"}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="tel" placeholder="+1 (555) 123-4567" className="input-field pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="San Francisco, CA" className="input-field pl-10" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      School/University
                    </label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        defaultValue={user?.school || "University of Technology"}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                    <textarea
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell us about yourself, your interests, and what you're working on..."
                      defaultValue="Passionate full-stack developer with a love for creating innovative web applications. Currently studying Computer Science and always eager to collaborate on exciting projects."
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skills & Technologies
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-primary-600 hover:text-primary-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="input-field flex-1"
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <button type="button" onClick={addSkill} className="btn-primary">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Links</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          GitHub
                        </label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input type="url" placeholder="https://github.com/username" className="input-field pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          LinkedIn
                        </label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn-primary inline-flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "project-updates",
                        label: "Project updates and milestones",
                        description: "Get notified when projects you're part of have updates",
                      },
                      {
                        id: "new-messages",
                        label: "New messages and mentions",
                        description: "Receive notifications for direct messages and mentions",
                      },
                      {
                        id: "team-invites",
                        label: "Team invitations",
                        description: "Get notified when someone invites you to join their project",
                      },
                      {
                        id: "weekly-digest",
                        label: "Weekly digest",
                        description: "Summary of your activity and recommendations",
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={item.id}
                          defaultChecked
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <label htmlFor={item.id} className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {[
                      {
                        id: "push-messages",
                        label: "Direct messages",
                        description: "Get push notifications for new direct messages",
                      },
                      { id: "push-mentions", label: "Mentions", description: "Get notified when someone mentions you" },
                      {
                        id: "push-deadlines",
                        label: "Project deadlines",
                        description: "Reminders for upcoming project deadlines",
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={item.id}
                          defaultChecked
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <label htmlFor={item.id} className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary inline-flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      {[
                        { id: "public", label: "Public", description: "Anyone can view your profile" },
                        {
                          id: "members",
                          label: "Members only",
                          description: "Only CollabNest members can view your profile",
                        },
                        { id: "private", label: "Private", description: "Only you can view your profile" },
                      ].map((option) => (
                        <div key={option.id} className="flex items-start space-x-3">
                          <input
                            type="radio"
                            id={option.id}
                            name="visibility"
                            defaultChecked={option.id === "members"}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <div className="flex-1">
                            <label htmlFor={option.id} className="text-sm font-medium text-gray-900 dark:text-white">
                              {option.label}
                            </label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Preferences</h3>
                    <div className="space-y-4">
                      {[
                        { id: "allow-messages", label: "Allow direct messages from other members" },
                        { id: "show-online", label: "Show when I'm online" },
                        { id: "show-projects", label: "Show my projects on my profile" },
                        { id: "show-skills", label: "Show my skills and experience level" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={item.id}
                            defaultChecked
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor={item.id} className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} className="input-field pr-10" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <input type="password" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <input type="password" className="input-field" />
                      </div>
                      <button className="btn-primary">Update Password</button>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                  <div className="space-y-3">
                    {[
                      { id: "light", label: "Light", description: "Use light theme" },
                      { id: "dark", label: "Dark", description: "Use dark theme" },
                      { id: "system", label: "System", description: "Use system preference" },
                    ].map((option) => (
                      <div key={option.id} className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id={option.id}
                          name="theme"
                          defaultChecked={option.id === (isDark ? "dark" : "light")}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <label htmlFor={option.id} className="text-sm font-medium text-gray-900 dark:text-white">
                            {option.label}
                          </label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Language & Region</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select className="input-field">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select className="input-field">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary inline-flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "help" && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Help & Support</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          question: "How do I create a new project?",
                          answer: 'Click the "Create Project" button on your dashboard or projects page.',
                        },
                        {
                          question: "How can I find teammates?",
                          answer: "Use the Discovery page to search for developers with specific skills.",
                        },
                        {
                          question: "How do I join a project?",
                          answer: "Contact the project owner through their profile or project page.",
                        },
                        {
                          question: "Can I change my username?",
                          answer: "Currently, usernames cannot be changed after account creation.",
                        },
                      ].map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Need help with something else? Our support team is here to help.
                    </p>
                    <button className="btn-primary">Contact Support</button>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Feedback</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Help us improve CollabNest by sharing your feedback and suggestions.
                    </p>
                    <button className="btn-secondary">Send Feedback</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
