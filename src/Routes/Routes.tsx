import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CreatePage } from "../Pages/CreatePage";
import { Registration } from "../Pages/CreatePage/Registration";
import { Login } from "../Pages";
import { LaunchWallet } from "../Helpers/ethereum";

function Routes() {

  const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login launchWallet={LaunchWallet}/>
	},
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
