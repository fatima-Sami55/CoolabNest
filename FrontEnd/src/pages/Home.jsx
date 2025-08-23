"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Users, FolderOpen, MessageCircle, Award, Zap, ArrowRight, Code, Sparkles } from "lucide-react"

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: Users,
      title: "Find Your Team",
      description: "Connect with students who share your interests and tech stack",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FolderOpen,
      title: "Manage Projects",
      description: "Organize team projects with dashboards, tasks, and documentation",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Collaborate with text, voice, and video communication",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Earn Badges",
      description: "Get recognized for your contributions and achievements",
      color: "from-orange-500 to-red-500",
    },
  ]

  const stats = [
    { label: "Active Students", value: "2,500+", icon: Users },
    { label: "Projects Created", value: "850+", icon: FolderOpen },
    { label: "Skills Shared", value: "120+", icon: Code },
    { label: "Collaborations", value: "1,200+", icon: Sparkles },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8 animate-bounce">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r  rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/logo.png" alt="CollabNest Logo" className="w-20 h-20" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white leading-tight">
              The Student Developer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                Playground
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Connect, collaborate, and create with fellow student developers. Build projects, share knowledge, and grow
              your skills in a community designed for learners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-fade-in-up delay-500">
            {user ? (
              <Link
                to="/dashboard"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-10 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
              >
                <span className="relative z-10">Go to Dashboard</span>
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-10 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/login"
                  className="group bg-white/80 backdrop-blur-sm text-gray-900 text-xl px-10 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-white transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-blue-200"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Collaborate
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From finding teammates to managing projects, CollabNest provides all the tools student developers need to
              succeed together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/20 rounded-full animate-pulse delay-2000"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">
            Ready to Start Collaborating?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed animate-fade-in-up delay-300">
            Join thousands of student developers who are already building amazing projects together.
          </p>
          {!user && (
            <Link
              to="/register"
              className="group inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-10 rounded-2xl text-xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-white/25 animate-fade-in-up delay-500"
            >
              Create Your Account
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="w-10 h-10 bg-gradient-to-r rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/logo.png" alt="CollabNest Logo" className="w-10 h-10" />
              </div>
              <span className="text-2xl font-bold">CollabNest</span>
            </div>
            <div className="text-gray-400 text-lg">© 2025 CollabNest. Built by students, for students.</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }

        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  )
}
export default Home