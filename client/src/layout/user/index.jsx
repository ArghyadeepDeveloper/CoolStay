import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
