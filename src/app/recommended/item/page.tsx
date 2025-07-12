import FeedBacks from "@/comps_ui/feedbacks";
import { supabase } from "@/utils/supabase/server";
import { FC, Suspense } from "react";

export default async function ItemPage() {
  const feedBacks = await feedBack();

  return (
    <>
      <section className="px-4">
        <div className="grid grid-cols-4 grid-rows-1 font-extrabold text-lg/relaxed">
          <h1>ID</h1>
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Content of the user</h1>
        </div>

      <div>          <h1>Total Feedbacks {feedBacks?.length}</h1>
          {feedBacks?.map((user) => (
            <div
              className="grid grid-cols-4 grid-rows-1 bg-slate-200 p-2"
              key={user.id * Math.floor(Math.random() * 100)}
            >
              <h1>{user.id}</h1>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <h1>{user.content}</h1>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


async function feedBack() {
  const { data, error } = await supabase.from("feedback").select("*");
  if (error) {
    return null;
  }
  if (data) return data;
}
