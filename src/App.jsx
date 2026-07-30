import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

function App() {
   const location = useLocation();

    const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>

            {!isAdmin && <Navbar />}

            <AppRoutes />

            {!isAdmin && <Footer />}

        </>
  );
}

export default App;