import { Navigate } from "react-router-dom";
import EditProfile from "../pages/mypage/EditProfile";
import MyPage from "../pages/mypage/MyPage";
import ProfileSearch from "../pages/mypage/ProfileSearch";
import WithDrawMembership from "../pages/mypage/WithdrawMembership";

const mypageRoutes = [
  {
    path: "",
    element: <MyPage />,
    children: [
      {
        index: true,
        element: <Navigate to="profile" replace />, //redirect default for /mypage
      },
      {
        path: "profile",
        element: <ProfileSearch />, //renders at /mypage/profile
      },
      {
        path: "edit",
        element: <EditProfile />,
      },
      {
        path: "withdraw",
        element: <WithDrawMembership />,
      },
    ],
  },
];

export default mypageRoutes;
