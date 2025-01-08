import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes // Change here
} from "react-router-dom";
import Webfonts from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js"
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOption.js"
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder.js"
import UserList from "./component/admin/UserList"
import UpdateUser from "./component/admin/UpdateUser"
import ProductReviews from "./component/admin/ProductReviews"
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
// import NotFound from "./component/layout/Not Found/NotFound";

// "proxy": "http://172.16.6.217:4000"

function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  const getStripeApiKey = useCallback(async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/stripeapikey`, {
      withCredentials: true,
    });
    setStripeApiKey(response.data.stripeApiKey);
  }, [BACKEND_URL]); // Dependency if BACKEND_URL can change

  useEffect(() => {
    Webfonts.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [getStripeApiKey]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/process/payment"
              element={<ProtectedRoute component={Payment} />}
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route  path="/password/forgot" element={<ForgotPassword />} /> {/* Change here */}
        <Route  path="/password/reset/:token" element={<ResetPassword />}/>

        {/* Protected routes */}
        <Route
          path="/account"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route
          path="/shipping"
          element={<ProtectedRoute component={Shipping} />}
        />
        <Route
          path="/success"
          element={<ProtectedRoute component={OrderSuccess} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute component={MyOrders} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails} />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} component={ProductList} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} component={OrderList} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} component={UserList} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
        />
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} component={ProductReviews} />}
        />
      </Routes>
      <Footer />
    </Router>
    )
    
}

export default App;
