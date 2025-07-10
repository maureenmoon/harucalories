import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

function RootLayout() {
  return (
    <div className="mx-auto">
      <Header />
      <Menu />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
