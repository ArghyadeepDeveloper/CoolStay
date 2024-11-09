import SalesCarousel from "./SalesCarousel";

export default function UserHomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-3 w-full">
      <div className="w-[80vw]">
        <SalesCarousel />
      </div>
    </div>
  );
}
