'use client'
import { useState, useEffect } from "react";

interface Resource {
  id: number,
  userId: number,
  title: string,
  body: string
}

function Page() {
  const [resource, setResource] = useState<Resource[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        const data = await response.json();
        setResource(data);
      } catch {
        console.log("error...occured..")
      }

    }
    fetchData();
  })

  return (<>
    {
      resource.filter(x => x.id < 4).map((res) => (
        <div key={res.id}>
          <h1 >{res.title}</h1>
          <h1 className="text-red-900 text-3xl">{res.id}</h1>
        </div>))

    }    <div>
            <h1> Hello man </h1>
    </div>
  </>);
}

export default Page;