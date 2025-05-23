import { supabase } from "@/utils/supabase/server";

async function FeedBacks() {

const {data,error} = await supabase.from("feedback").select();
if(error) {
  <h2> Error fetching data...</h2>
}
     return (
       <div className="text-4xl">
         {data?.map((feedback: any) => (
          <div key={feedback.id} className="grid grid-cols-3  grid-rows-1 gap-4">
           <h1>{feedback.name}</h1>
           <h1>{feedback.content}</h1>
          </div>
         ))}
       </div>
     );
}

export default FeedBacks;