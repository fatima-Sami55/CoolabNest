"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data and token
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      
      // Store token and user data
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      
      setUser(response.user)
      return response.user
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData()
      
      // Map frontend fields to backend fields
      formData.append('email', userData.email)
      formData.append('password', userData.password)
      formData.append('userName', userData.name) // Frontend 'name' -> Backend 'userName'
      formData.append('school', userData.school)
      formData.append('experience', parseInt(userData.experience) || 0) // Convert to number
      
      // Add profile picture if provided
      if (userData.profilePicture) {
        formData.append('profilePicture', userData.profilePicture)
      }
      
      const response = await authAPI.register(formData)
      
      // Store token and user data
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      
      setUser(response.user)
      return response.user
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with local logout even if backend call fails
    } finally {
      // Clear local storage and state
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    }
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
