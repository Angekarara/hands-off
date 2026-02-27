import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ItemsPage from "./pages/ItemsPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ItemsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
