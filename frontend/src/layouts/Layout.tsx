import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

interface Props {
    children: React.ReactNode;
    headerLoading: boolean;
}

const Layout = ({ children, headerLoading }: Props) => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header headerLoading={headerLoading} />
            <Hero />
            {location.pathname !== "/signin" && location.pathname !== "/register" ? (
                <>
                    <div className="container mx-auto">
                        <SearchBar />
                    </div>
                </>
            ) : null}

            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
