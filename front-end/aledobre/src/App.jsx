import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NotFound } from './pages/NotFoundPage'
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
