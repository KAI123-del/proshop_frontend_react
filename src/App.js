import Header from "./components/Header";
import Products from "./Screens/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./Screens/ProductDetails";
import Cart from "./Screens/Cart";
import Login from "./Screens/Login";
import Register from './Screens/Register'
import UserProfile from './Screens/UserProfile'
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderDetails from "./Screens/OrderDetails";
import UserListScreen from "./Screens/UserListScreen";
import EditUserScreen from "./Screens/EditUserScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import EditProductScreen from "./Screens/EditProductScreen";
import ListAllOrders from "./Screens/ListAllOrders";
import Footer from "./components/Footer";
import Loader from "./components/Loader";



function App() {
  return (
    <Router>
      <div style={{ backgroundColor: " #333", height: "100%" }}>
        <Header />
        <Routes>
          <Route path={"/"} element={<Products />} />
          <Route path={"/search/:keyword"} element={<Products />} />
          <Route path="/loader" element={<Loader/>}/>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/listAllOrders"} element={<ListAllOrders />} />
          <Route path={"/userList"} element={<UserListScreen />} />
          <Route path={"/productList"} element={<ProductListScreen />} />
          <Route path={"/editProduct/:id"} element={<EditProductScreen />} />
          <Route path={"/userList/:id"} element={<EditUserScreen />} />
          <Route path={"products/:id"} element={<ProductDetails />} />
          <Route path={"/cart/:id"} element={<Cart />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/shipping"} element={<ShippingScreen />} />
          <Route path={"/payment"} element={<PaymentScreen />} />
          <Route path={"/orders"} element={<OrderScreen />} />
          <Route path={"/orders/:id"} element={<OrderDetails />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
