import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout({ children }) {

    return (

        <div className="app">

            <Navbar />

            <div className="container">

                <Sidebar />

                <main className="content">

                    {children}

                </main>

            </div>

            <Footer />

        </div>

    );

}

export default MainLayout;