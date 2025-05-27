import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
