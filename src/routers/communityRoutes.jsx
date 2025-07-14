import { Navigate } from "react-router-dom";
import Board from "../pages/community/Board";
import Issue from "../pages/community/Issue";
import MainBoard from "../components/community/board/MainBoard";
import Write from "../components/community/board/Write";
import WriteView from "../components/community/board/WriteView";
import WriteUpdate from "../components/community/board/WriteUpdate";

const communityRoutes = [
  {
    index: true,
    element: <Navigate to="issue" replace />,
  },
  {
    path: "issue",
    element: <Issue />,
  },
  {
    path: "board",
    element: <MainBoard />,
  },
  {
    path: "board/write",
    element: <Write />,
  },
  {
    path: "board/writeview/:id",
    element: <WriteView />,
  },
  {
    path: "board/update/:id",
    element: <WriteUpdate />,
  },
];

export default communityRoutes;
