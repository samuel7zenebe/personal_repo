'use client'

import { handleLogin } from "@/actions/handleLogin";

function About() {
    return ( <>
    <form className="flex flex-col items-center justify-center mt-4" action={handleLogin}>
   <input className="border-1 font-light focus:outline-none border-gray-700 p-1 m-2 focus:border-green-400 rounded-lg"  type="text" name="name" id="" />
   <button className="bg-green-500 text-white m-2 p-2 rounded-2xl" type="submit">
 let server handle login...
      </button>
    </form>
   
    </> );
}

export default About;