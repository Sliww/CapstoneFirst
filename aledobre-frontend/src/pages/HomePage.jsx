import { NavAndFooterLayout } from '../components/Layouts/Navbar-Footer-Layout';
import { Home } from '../components/HomePageComponent/home';

export const HomePage = ()=>{
    return (
        <>
            <NavAndFooterLayout>
                <Home/>
            </NavAndFooterLayout>
        
        </>
    )
}