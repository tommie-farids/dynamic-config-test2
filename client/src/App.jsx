import { BrowserRouter, Routes, Route } from 'react-router'

import './App.css'

import Navbar from './components/Navbar'
import Products from './pages/Products'
import Add from './pages/Add'
import Update from './pages/Update'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
