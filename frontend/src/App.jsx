import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        setMessage(response.data.message)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setMessage('Error connecting to backend')
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <h1>DevOps Pipeline Demo</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>Message from backend: {message}</p>
      )}
    </div>
  )
}

export default App
