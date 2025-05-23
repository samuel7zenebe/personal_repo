"use client";
import { useActionState, useEffect } from "react";
import { handleFeedBackAction } from "@/actions/handleLogin";

export type FeedbackType = {
  email: string | undefined;
  content: string | undefined;
  success: boolean;
  message: string;
};
const initialState: FeedbackType = {
  email: "",
  content: "",
  success: false,
  message: "",
};

const initialCount = 0;

function Page() {
  const [state, formAction, isPending] = useActionState(
    handleFeedBackAction,
    initialState
  );

  useEffect(() => {
    console.log("State  Changed...");
  }, [state]);

  const disableButtonStyle = !isPending ? "hover:bg-blue-500" : "";
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <main className="bg-slate-800 text-neutral-100 p-4 font-bold text-xl text-center w-full">
        Proposed Knowledge Management System.
      </main>
      <form
        action={formAction}
        className="lg:w-1/2 w-full  flex justify-center items-center flex-col  gap-4 mx-2"
      >
        <h1 className="text-2xl font-light p-2">
          Do You have anything to share ?
        </h1>
        <p className="text-slate-500">
          help us notice something that we are not aware of and build better
          product.
        </p>
        <p className="block text-sm text-bold text-red-600">
          {state.success === false ? state.message : ""}
        </p>
        <div className="flex flex-col justify-start  mt-2 items-start w-full">
          <label className="text-sm/tight font-semibold" htmlFor="email">
            Your Email Address
          </label>
          <input
            className="ring-1 w-full ring-blue-200 my-2 rounded-sm py-2
        focus:outline-0 px-3 focus:ring-blue-400 text-neutral-800
        text-lg/snug font-light"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col justify-start  mt-2 items-start w-full">
          <label className="text-sm/tight font-semibold" htmlFor="content">
            Your Idea
          </label>
          <textarea
            className="ring-1 w-full ring-blue-200 my-2 rounded-sm py-2
        focus:outline-0 px-3 focus:ring-blue-400 text-neutral-800
        text-lg/snug font-light h-30"
            name="content"
            id="content"
          ></textarea>
        </div>
        <div className="flex flex-col justify-start  mt-2 items-start w-full">
          <button
            disabled={isPending}
            type="submit"
            className={`bg-blue-400 ${disableButtonStyle}  cursor-pointer text-white w-full p-2 my-1 font-bold text-lg/loose`}
          >
            {isPending ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
      {state.success === true && (
        <section className="mt-4 bg-green-100 w-1/2 h-20 p-4 text-green-950 rounded-2xl">
          <p className="text-lg">
            <span className="underline font-extrabold m-2">
              {state.email?.split("@")[0]}
            </span>
            said
            <span className="m-2">{state.content}</span>
          </p>
        </section>
      )}
    </div>
  );
}

export default Page;
