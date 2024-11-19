import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-[50px]" id="main-container">
        <Outlet />
      </div>
    </div>
  );
}
