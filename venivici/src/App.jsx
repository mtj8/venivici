import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="whole-page">
      <div className="main-page">
          <h1>What to watch?</h1>
      </div>
      <div className="gallery">
          <h3>Previous anime:</h3>
      </div>
    </div>
  )
}

export default App
