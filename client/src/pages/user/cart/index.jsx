import jacketImage from "../../../assets/cart/jacket-image.jpg";
import tShirtImage from "../../../assets/cart/t-shirt-image.jpg";
import jeansImage from "../../../assets/cart/jeans-image.jpg";
import { Button } from "rsuite";
import { IconTrash } from "@tabler/icons-react";

export default function UserCartPage() {
  const cartItems = [
    {
      id: 0,
      name: "T shirt",
      color: "Black",
      rating: 4.3,
      image: tShirtImage,
      quantity: 2,
      originalPrice: 120.5,
      discountedPrice: 100.5,
    },
    {
      id: 1,
      name: "Blue Denim",
      color: "Blue",
      rating: 4.2,
      image: jeansImage,
      quantity: 1,
      originalPrice: 120.5,
      discountedPrice: 100.5,
    },
    {
      id: 2,
      name: "Bomber Jacket",
      color: "Red",
      rating: 4.6,
      image: jacketImage,
      quantity: 1,
      originalPrice: 120.5,
      discountedPrice: 100.5,
    },
  ];
  return (
    <div className="flex flex-col flex-start p-4 gap-5">
      <header className="font-semibold text-2xl">My Cart</header>
      <div className="flex xs:flex-col sm:flex-col md:flex-row items-center justify-between w-full">
        <div className="border border-gray-200 xs:w-full sm:w-full md:w-full lg:w-3/5 rounded-md">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center p-4">
              <div className="flex p-6 gap-6" key={item.id}>
                <img
                  src={item.image}
                  className="w-[100px] h-[100px] rounded-md"
                />
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">{item.name}</span>
                  <span className="font-medium">{item.color}</span>
                  <div className="flex gap-2 text-xl font-semibold my-2">
                    <span>₹{item.discountedPrice}</span>{" "}
                    <span className="line-through">₹{item.originalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 h-full justify-around items-center">
                <div className="flex gap-2">
                  <Button>+</Button>
                  <span className="flex justify-center items-center border border-slate-200 rounded-md px-4">
                    {item.quantity}
                  </span>
                  <Button>-</Button>
                </div>
                <div className="cursor-pointer mx-3 bg-red-100 rounded-md p-2">
                  <IconTrash className="text-red-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
