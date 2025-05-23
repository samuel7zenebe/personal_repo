import { supabase } from "@/utils/supabase/server";
import { FC } from "react";

interface PageProps {
  params: {
    itemId: Promise<string>;
  };
}

const ItemPage: FC<PageProps> = async ({ params }) => {
  const itemId = await params.itemId;
  const feedBacks = await feedBack();

  return (
    <>
      <section className="px-4">
        <div className="grid grid-cols-4 grid-rows-1 font-extrabold text-lg/relaxed">
          <h1>ID</h1>
          <h1>Name</h1>
          <h1>Email</h1>
          <h1>Content</h1>
        </div>
        <div>
          {feedBacks?.map((user) => (
            <div
              className="grid grid-cols-4 grid-rows-1 bg-slate-200"
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
};

async function feedBack() {
  const { data, error } = await supabase.from("feedback").select("*");
  if (error) {
    return null;
  }
  if (data) return data;
}

export default ItemPage;
