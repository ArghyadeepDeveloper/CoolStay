import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./layout/user";
import UserHomePage from "./pages/user/home";
import UserProfilePage from "./pages/user/profile";
import UserCartPage from "./pages/user/cart";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* Define nested routes here */}
          <Route index element={<UserHomePage />} /> {/* Default route for / */}
          <Route path="profile" element={<UserProfilePage />} />{" "}
          <Route path="cart" element={<UserCartPage />} />
          {/* /profile */}
        </Route>
      </Routes>
    </Router>
  );
}
