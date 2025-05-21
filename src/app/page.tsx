"use client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import messageIcon from "@/public/images/message.svg";
import Illustration from "@/public/images/share_illustration.svg";

function Page() {
  return (
    <div className="w-screen  flex flex-col bg-[#5AC8FA] h-screen">
      <main className="w-full flex justify-between items-center p-2">
        <h1>Logo</h1>
        <Button
          className=" text-black rounded-sm p-5 bg-white border-1 hover:bg-white hover:border-neutral-600 shadow-lg hover:shadow-2xl cursor-pointer"
          onClick={() => {
            redirect("/login");
          }}
        >
          Get Started
        </Button>
      </main>

      <div className="flex w-full text-white flex-1 items-center justify-center">
        <div className="flex-1/2">
          <h1 className="text-5xl m-4 font-light">Share Your Ideas With Us</h1>
          <p className="ml-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
            voluptatibus voluptatum sint cum fugiat animi quas, ad modi corrupti
            iste at cupiditate mollitia aliquam aut velit porro, aliquid,
            assumenda laudantium. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Corrupti eum in quas, officiis eligendi placeat
            aliquid ab fugiat reprehenderit repellat perferendis id rerum
            aspernatur sint sit deleniti doloribus quisquam nihil?
          </p>
        </div>
        <div className="flex-1/2">
          <Image src={Illustration} alt="illustration" />
        </div>
      </div>
    </div>
  );
}
export default Page;
