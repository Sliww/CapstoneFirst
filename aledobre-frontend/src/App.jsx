import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TraditionPage } from './pages/TraditionPage'
import { LoginPage } from './pages/LoginPage'
import { NotFound } from './pages/NotFoundPage'


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/profilo' element={<ProfilePage />} />
          <Route path='/latradizione' element={<TraditionPage />} />
          <Route path='/login' element={<LoginPage />} />
          
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
