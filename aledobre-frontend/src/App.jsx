import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { TraditionPage } from './pages/TraditionPage'
import { LoginPage } from './pages/LoginPage'
import { NotFound } from './pages/NotFoundPage'
import { SignUpPage } from './pages/SignUpPage'
import { AdminPage } from './pages/AdminPage'
import { AddDish } from './components/AdminComponent/AddDishComponent/AddDish'
import { UsersList } from './components/AdminComponent/UsersListComponent/UsersList'
import { ContactsPage } from './pages/ContactsPage'
import { ReservationPage } from './pages/ReservationPage'
import { UsersReservations } from './components/AdminComponent/ReservationsListComponent/UsersReservations'
import { AdminProtectedRoutes } from './middlewares/ProtectedRoutes'
import { AuthProvider } from './context/AuthContextComp'
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
                <Route path='/prenota' element={
                    <AnimatedPage>
                        <ReservationPage />
                    </AnimatedPage>
                } />
                <Route path='/contatti' element={
                    <AnimatedPage>
                        <ContactsPage />
                    </AnimatedPage>
                } />
                <Route path='/login' element={
                    <AnimatedPage>
                        <LoginPage />
                    </AnimatedPage>
                } />
                <Route path='/signup' element={
                    <AnimatedPage>
                        <SignUpPage />
                    </AnimatedPage>
                } />

                <Route element={<AdminProtectedRoutes />}>
                    <Route path='/admin-panel' element={<AdminPage />}>
                        <Route index element={<AddDish />} />
                        <Route path="dishes" element={<AddDish />} />
                        <Route path="users" element={<UsersList />} />
                        <Route path="reservations" element={<UsersReservations />} />
                    </Route>
                </Route>

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
        <AuthProvider>
            <BrowserRouter>
                <AnimatedRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
