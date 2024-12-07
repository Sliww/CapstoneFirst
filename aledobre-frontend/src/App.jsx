import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TraditionPage } from './pages/TraditionPage'
import { LoginPage } from './pages/LoginPage'
import { NotFound } from './pages/NotFoundPage'
import AnimatedPage from './components/AnimatedPageComponent/AnimatedPage'

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={
                    <AnimatedPage>
                        <HomePage />
                    </AnimatedPage>
                } />
                <Route path='/profilo' element={
                    <AnimatedPage>
                        <ProfilePage />
                    </AnimatedPage>
                } />
                <Route path='/latradizione' element={
                    <AnimatedPage>
                        <TraditionPage />
                    </AnimatedPage>
                } />
                <Route path='/login' element={
                    <AnimatedPage>
                        <LoginPage />
                    </AnimatedPage>
                } />
                <Route path='*' element={
                    <AnimatedPage>
                        <NotFound />
                    </AnimatedPage>
                } />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
};

export default App;
