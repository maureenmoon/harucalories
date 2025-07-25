import { createBrowserRouter } from "react-router-dom";
import Meal from "../pages/meal/Meal";
import Analyis from "../pages/meal/Analyis";
import RootLayout from "../layout/RootLayout";
import haruReportRoutes from "./haruReportRoutes";
import communityRoutes from "./communityRoutes";
import MyPage from "../pages/mypage/MyPage";
import memberRoutes from "./memberRoutes";
import Result from "../pages/meal/result";
import mypageRoutes from "./mypageRoutes";
import WelcomeMain from "../pages/welcome/welcomeMain";

const root = createBrowserRouter([
  // 웰컴 페이지를 위한 별도 라우터 (헤더/메뉴 없음)
  {
    path: "/welcome",
    element: <WelcomeMain />,
  },
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
        path: "result/:id",
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
    children: mypageRoutes,
    // children: [
    //   {
    //     // path: "/mypage",
    //     path: "",
    //     element: <MyPage />,
    //   },
    // ],
  },
]);

export default root;
