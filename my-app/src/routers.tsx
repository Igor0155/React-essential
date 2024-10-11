import { createBrowserRouter } from "react-router-dom";
import LayoutView from "./app/Layout";
import HomeView from "./app/home";
import ProductView from "./app/home/components/productView";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutView />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "product/:productId",
        element: <ProductView/>,
        // pegar 1 pelo params
        // function retorna 1 produto
        // cria state
        // produto na tela
      }
    ]
  },
]);

export default router;