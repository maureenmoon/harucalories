import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import useInitAuth from "./components/mypage/useInitAuth";

function App() {
  useInitAuth();
  return <RouterProvider router={router} />;
}

export default App;
