function Page() {
  return (
    <>
      <main className="w-full">
        <p className="w-full text-accent-foreground text-sm bg-purple-500 px-2 text-center py-0.5">
          Do you like books ?
        </p>
        <div>
          <h1 className="text-lg font-bold text-gray-300">Political books</h1>
          <h1 className="text-lg font-bold text-gray-300">Science books</h1>
          <h1 className="text-lg font-bold text-gray-300">Spiritual books</h1>
        </div>
      </main>
      <div>
        <h1> Content Mini</h1>
      </div>
    </>
  );
}
export default Page;
