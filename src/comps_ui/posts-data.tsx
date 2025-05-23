async function Posts() {
   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
     method: "GET",
   });
   const posts = await response.json() 
     return ( <div className="text-4xl">
          {
      posts.map((post:any)=>(
        <h1>{post.title}</h1>
      ))      
          }
    </div>  );
}

export default Posts;