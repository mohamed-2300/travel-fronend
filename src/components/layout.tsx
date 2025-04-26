
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { NavBar } from "./navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-noor-dark bg-arabesque-pattern bg-fixed">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
