import Register from "../pages/Register/Register";
// import navbar from "../components/navbar/navbar";
import Login from "../pages/Login/Login";
import { Shop } from "../pages/Shop/shop";
import { Cart } from "../pages/cart/cart";
import Profile from "../pages/Profile/Profile";
import Order from "../pages/Order/Order";
import OrderDetail from "../pages/OrderDetails/OrderDetail";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Admin from "../pages/Admin/Admin";
import ContactForm from "../pages/contact/ContactForm";
import OrderList from "../pages/Order/OrderList";
import Success from "../pages/Payment/sucess";
import Fail from "../pages/Payment/fail";

export const routes = [
  {
    path: "/sign-in",
    page: Login,
  },
  {
    path: "/sign-up",
    page: Register,
  },
  {
    path: "/",
    page: Shop,
  },
  {
    path: "/cart",
    page: Cart,
  },
  {
    path: "/profile-user",
    page: Profile,
  },
  {
    path: "/order",
    page: Order,
  },
  {
    path: "/order-details/:id",
    page: OrderDetail,
  },
  {
    path: "/product-details/:id",
    page: ProductDetails,
  },
  {
    path: "/system/admin",
    page: Admin,
  },
  {
    path: "/contact",
    page: ContactForm,
  },
  {
    path: "/orders/:user_id",
    page: OrderList,
  },
  {
    path: "/payment/success",
    page: Success,
  },
  {
    path: "/payment/fail",
    page: Fail,
  }
];
