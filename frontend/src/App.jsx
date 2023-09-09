import AnimalCard from './components/AnimalCard'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/animal/:id' element={<AnimalCard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
