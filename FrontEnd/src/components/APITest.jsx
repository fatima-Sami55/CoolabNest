import { useState } from 'react'
import { authAPI } from '../utils/api'

const APITest = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    try {
      const response = await authAPI.login('test@example.com', 'password123')
      setResult({ type: 'success', data: response })
    } catch (error) {
      setResult({ type: 'error', data: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testBackendConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/home')
      const text = await response.text()
      setResult({ type: 'success', data: text })
    } catch (error) {
      setResult({ type: 'error', data: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">API Test Dashboard</h2>
      
      <div className="space-y-4">
        <button
          onClick={testBackendConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Backend Connection
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Login API
        </button>
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-yellow-100 rounded">
          Loading...
        </div>
      )}

      {result && (
        <div className={`mt-4 p-4 rounded ${result.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="font-bold">{result.type === 'success' ? 'Success:' : 'Error:'}</h3>
          <pre className="mt-2 text-sm overflow-x-auto">
            {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default APITest
