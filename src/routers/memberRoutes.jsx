import Login from "../pages/member/Login";
import Signup from "../pages/member/Signup";
import MyPage from "../pages/mypage/MyPage";

const memberRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
];

export default memberRoutes;
