import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import App from "./App.jsx";
import DetailPage from "./components/pages/DetailPage.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import CheckoutPage from "./components/checkout/CheckoutPage.jsx";
import OrderConfirmation from "./components/checkout/OrderConfirmation";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import ProductForm from "./components/Admin/ProductForm.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import AdminLoginPage from "./components/Auth/AdminLoginPage.jsx";
import CartToast from "./components/CartToast.jsx";
import "./index.css";
import Shop from "./components/pages/Shop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<DetailPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />

              {/* Category Routes */}
              <Route path="/new-arrivals" element={<CategoryPage />} />
              <Route path="/classe" element={<CategoryPage />} />
              <Route path="/sport" element={<CategoryPage />} />
              <Route path="/luxury" element={<CategoryPage />} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/add" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="orders" element={<OrderList />} />
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
            <CartToast />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
);
