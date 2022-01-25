import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:name" element={<App />} />
      </Routes>
    </Router>
  )
}

export default RoutesComponent
