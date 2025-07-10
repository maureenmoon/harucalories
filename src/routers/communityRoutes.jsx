import { Navigate } from "react-router-dom";
import Board from "../pages/community/Board";
import Issue from "../pages/community/Issue";

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
    element: <Board />,
  },
];

export default communityRoutes;
