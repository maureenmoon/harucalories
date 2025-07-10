import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";

function RootLayout() {
  return (
    <div className="mx-auto">
      <Header />
      <Menu />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
