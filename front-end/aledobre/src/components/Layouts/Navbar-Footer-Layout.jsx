import React from "react";
import { Navbar } from "../NavbarComponent/Navbar";
import { Footer } from "../FooterComponent/Footer";

export const NavAndFooterLayout = ({children}) =>{
    return (
        <div>
            <>
            <Navbar/>
            {children}
            <Footer/>
            </>
        </div>
    )
}