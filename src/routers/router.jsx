import { createBrowserRouter } from "react-router-dom";
import Meal from "../pages/meal/Meal";
import Analyis from "../pages/meal/Analyis";
import RootLayout from "../layout/RootLayout";
import haruReportRoutes from "./haruReportRoutes";
import communityRoutes from "./communityRoutes";
import MyPage from "../pages/mypage/MyPage";
import memberRoutes from "./memberRoutes";
import Result from "../pages/meal/result";

const root = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Meal />,
      },
      {
        path: "/Analyis",
        element: <Analyis />,
      },
      {
        path: "/Result",
        element: <Result />,
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
    path: "/member",
    // path: "/login",
    element: <RootLayout />,
    children: memberRoutes,
  },
  {
    path: "/mypage",
    element: <RootLayout />,
    children: [
      {
        // path: "/mypage",
        path: "",
        element: <MyPage />,
      },
    ],
  },
]);

export default root;
