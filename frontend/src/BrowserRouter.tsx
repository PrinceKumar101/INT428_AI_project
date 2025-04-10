import { createBrowserRouter } from "react-router";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";

export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
