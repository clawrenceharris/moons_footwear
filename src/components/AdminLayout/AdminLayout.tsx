import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { AuthContextType } from "../../context/AuthContext";

const AdminLayout = () => {
  const context = useOutletContext<AuthContextType>();

  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        <Outlet context={context} />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
