import { useState } from "react"
import Education from './pages/Education'
import Tasks from "./pages/Tasks"
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Education />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
