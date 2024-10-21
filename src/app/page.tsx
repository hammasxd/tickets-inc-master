import AvailableEvents from "@/components/AvailableEvents";
import Banner from "@/components/Banner";
import Image from "next/image";

export default function Home() {
  return (
   <div className=" flex flex-col items-center justify-center w-full align-middle mt-10">
        <Banner/>
        <AvailableEvents  />

   </div>
  );
}
