import Image from "next/image";
import grp1 from "../../public/grp1.jpg"
import grp2 from "../../public/grp2.jpg"
import { CarouselHome } from "@/components/CarousalUI";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <div>
      <Navbar status='hidden' />
    <div className="p-10 ">
      <div className="text-center m-5 text-blue-400 font-bold">
        <h1 className="sm:text-4xl text-xl">SHOP BY CATEGORY</h1>
      </div>
      <div className="grid grid-cols-2 gap-5 content-evenly m-5">
        <div className="border-4"><Image className="w-full" src={grp1} alt="male Grp"   /></div>
        <div className="border-4"><Image className="w-full h-full" src={grp2} alt="female Grp"   /></div>
      </div>

      <div className="p-20 ab">
          <CarouselHome />
      </div>

    </div>
    </div>
  );
}
