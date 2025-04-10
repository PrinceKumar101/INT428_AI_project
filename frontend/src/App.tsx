import { RouterProvider } from "react-router";
import { BrowserRouter } from "./BrowserRouter";

const App = () => {
  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  );
};

export default App;
