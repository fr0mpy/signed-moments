import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreatePage } from "../Pages/CreatePage";
import { Registration } from "../Pages/CreatePage/Registration";

function Routes() {

  const router = createBrowserRouter([
    {
      path: "/create",
      element: <CreatePage />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
