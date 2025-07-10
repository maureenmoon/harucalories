import { createBrowserRouter } from "react-router-dom";
import Meal from "../pages/meal/Meal";
import RootLayout from "../layout/RootLayout";
import haruReportRoutes from "./haruReportRoutes";
import communityRoutes from "./communityRoutes";
import MyPage from "../pages/mypage/MyPage";

const root = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Meal />,
      },
    ],
  },
  {
    path: "/haruReport",
    element: <RootLayout />,
    children: haruReportRoutes,
  },
  {
    path: "/community",
    element: <RootLayout />,
    children: communityRoutes,
  },
  {
    path: "/mypage",
    element: <RootLayout />,
    children: [
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
]);

export default root;
