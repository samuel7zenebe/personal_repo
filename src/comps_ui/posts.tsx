export default async function Posts() {
  try {
    const posts = await getPosts();
    return (
      <div>
        {posts.map((p: any) => (
          <div
            key={p.id}
            className="w-80 m-2 p-2 bg-slate-200 border-2 border-slate-300"
          >
            <h1 className="text-lg font-bold">{p.title}</h1>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    );
  } catch (e) {
    return <h1>Server component...</h1>;
  }
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 60 },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Fetching Error..");
  }
}
