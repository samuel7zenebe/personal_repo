"use client";
import { supabase } from "@/utils/supabase/server"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  "use client";
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();


  return (
    <section className="w-screen flex flex-col justify-center items-center gap-y-4">
      <Session />
      <h1 className="text-2xl text-purple-600 w-full text-center mb-10 mt-4 font-bold">
        Sign In
      </h1>
      <div className="w-1/2 flex flex-col justify-start items-start gap-y-1 text-gray-200">
        <label className="w-full text-sm text-ellipsis" htmlFor="email">
          Email
        </label>
        <input
          className="w-full p-1.5 bg-gray-950 border-[0.4px] border-gray-50 "
          value={email}
          onChange={(e) => {
            setEmail((prevState) => e.target.value);
          }}
          type="email"
          name="email"
          id="email"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-start items-start gap-y-1 text-gray-200">
        <label className="w-full text-sm text-ellipsis" htmlFor="password">
          Password
        </label>
        <input
          className="w-full p-1.5 bg-gray-950 border-[0.4px] focus:border-0 not-focus:outline-0 notfocus:border-gray-50 focus:outline-green-500"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword((prevState) => e.target.value);
          }}
          name="password"
          id="password"
        />
      </div>
      <button
        className="w-1/2 p-2 bg-purple-600 hover:bg-purple-700"
        onClick={async () => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) {
            console.log(error);
          } else {
            router.push("/");
          }
        }}
      >
        Sign In
      </button>

      <button
        className="w-1/2 p-2 bg-purple-600 hover:bg-purple-700"
        onClick={async () => {
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          if (error) {
            console.log(error);
          } else {
            router.push("/");
          }
        }}
      >
        Sign Up
      </button>
    </section>
  );
}


function Session() {
  const [sessionState,setSessionState] = useState<string>("");
  const router = useRouter();
  useEffect(()=>{
    (async ()=>{
        const session  = await getSession();
        if(session?.user.email){
            setSessionState(session?.user.email);
        }
    })();
  })
  return (
    <div>
      <h1 className="text-2xl text-green-500">
        Current User IS <span className="text-amber-900">{sessionState}</span>
      </h1>
      <button onClick={async()=>{
        console.log("Signing out a user.");
         await supabase.auth.signOut();
         router.refresh();
      }} className="p-2 bg-red-500  text-white hover:bg-red-600 w-md">Sign Out</button>
    </div>
  );
}


async function getSession() {
    const {
        data,error
    } = await  supabase.auth.getSession();
    
    
    
    if(data.session){
    return data.session;

  }
  else {
    return null;
  }
}


async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (data.user) {
    return data.user;
  } else {
    return null;
  }
}