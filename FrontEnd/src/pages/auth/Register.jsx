"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"
import { Eye, EyeOff, Mail, Lock, User, School, Zap, Upload, Camera } from "lucide-react"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [universities, setUniversities] = useState([])
  const [loadingUniversities, setLoadingUniversities] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUniversities, setFilteredUniversities] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  // Fetch universities when component mounts
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoadingUniversities(true)
        const response = await fetch('http://universities.hipolabs.com/search?country=Pakistan')
        const data = await response.json()
        
        // Sort universities alphabetically by name
        const sortedUniversities = data.sort((a, b) => a.name.localeCompare(b.name))
        setUniversities(sortedUniversities)
        setFilteredUniversities(sortedUniversities)
      } catch (error) {
        console.error('Error fetching universities:', error)
        toast.error('Failed to load universities. Please refresh the page.')
      } finally {
        setLoadingUniversities(false)
      }
    }

    fetchUniversities()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.university-dropdown')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter universities based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUniversities(universities)
    } else {
      const filtered = universities.filter(university =>
        university.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUniversities(filtered)
    }
  }, [searchTerm, universities])

  const handleUniversitySearch = (event) => {
    setSearchTerm(event.target.value)
    setShowDropdown(true)
  }

  const selectUniversity = (universityName) => {
    setSearchTerm(universityName)
    setShowDropdown(false)
    // Update the form value
    setValue('school', universityName)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }    
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      
      setProfilePicture(file)
      
      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        school: data.school,
        experience: data.experience,
        profilePicture: profilePicture,
      })
      toast.success("Account created successfully! Please check your email for verification.")
      navigate("/login")
    } catch (error) {
      const errorMessage = error.message || "Failed to create account"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="logo" className="w-12 h-12 object-cover" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join CollabNest</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create your account and start collaborating</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("name", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                  type="text"
                  className="input-field pl-10"
                  placeholder="Enter your username"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                School/University
              </label>
              <div className="relative university-dropdown">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("school", {
                    required: "Please select your school/university",
                  })}
                  type="text"
                  className="input-field pl-10"
                  placeholder={loadingUniversities ? 'Loading universities...' : 'Search for your school/university'}
                  value={searchTerm}
                  onChange={handleUniversitySearch}
                  onFocus={() => setShowDropdown(true)}
                  disabled={loadingUniversities}
                  autoComplete="off"
                />
                {showDropdown && !loadingUniversities && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredUniversities.length > 0 ? (
                      filteredUniversities.slice(0, 100).map((university, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => selectUniversity(university.name)}
                        >
                          {university.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500 text-sm">
                        No universities found matching "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </div>
              {errors.school && <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>}
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience Level
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Zap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("experience", {
                    required: "Experience level is required",
                  })}
                  className="input-field pl-10"
                >
                  <option value="">Select your experience level</option>
                  <option value="0">Beginner (0 years)</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="10">10+ years</option>
                </select>
              </div>
              {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                      message: "Password must contain at least one uppercase letter and one number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input-field pl-10 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                  type="password"
                  className="input-field pl-10"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center">
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
