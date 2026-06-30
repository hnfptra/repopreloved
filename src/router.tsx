// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Payment from "./screens/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
