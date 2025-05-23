import { supabase } from "@/utils/supabase/server";
export type UserType = {
    id: number,
    created_at: string | undefined,
    name: string | undefined,
    content:string | undefined,
    email:string | undefined
  }

export default async function Page({
    params
}:{
    params:{
        itemId: Promise<string>
    }
}) {
    const id = await params.itemId;
    const feedBacks = await feedBack();

return (
  <section className="px-4">
    <h1>
   
      Recommended Web sites and tools <span className="font-bold"> {id}</span>
    </h1>
    <div
      className="grid grid-cols-4 grid-rows-1 font-extrabold text-lg/relaxed"
     
    >
      <h1>ID</h1>
      <h1>Name</h1>
      <h1>Email</h1>
      <h1>Content</h1>
    </div>
    <div>
      {feedBacks?.map((user) => (
        <div
          className="grid grid-cols-4 grid-rows-1"
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
);
}



export async function feedBack() {
    const {data,error} = (await supabase.from("feedback").select("*"));
    if(error) {
        return null
    }
    if(data)  return data;
}