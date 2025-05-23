"use client";
import { supabase } from "@/utils/supabase/server";
import { useState, useEffect } from "react";

type BookType = {
  id: number;
  title: string;
  author: string;
  publication_date: string;
  genre: string;
  isbn: string;
};

function Page() {
  const [resource, setResource] = useState<BookType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("books").select();
        if (data) {
          console.log(data);
          setResource(data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        console.log("finally");
      }
    };
    fetchData();
  }, []);
  const handleForm = async (formData: FormData) => {
    const isbn = String(formData.get("isbn"));
    const id = String(formData.get("id"));
    const { data, error } = await supabase
      .from("books")
      .update({
        isbn,
      })
      .eq("id", id)
      .select();
  };
  return (
    <section className="w-full">
      <h1 className="mb-4 text-green-600 bg-slate-50"> SUPABASE lets see </h1>
      <form className="flex flex-col bg-slate-100" action={handleForm}>
        <div className="w-full">
          <label htmlFor="id">ID</label>
          <select className="border-1 border-green-300" name="id" id="id">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="isbn">ISBN :</label>
          <input type="text" name="isbn" is="isbn" />
        </div>
        <button className="bg-green-800 text-white p-2 m-2" type="submit">
          Change ISBN for Book 1
        </button>
      </form>
      <div>
        <div className="flex flex-row">
          <h1>Title</h1>
          <h1>ISBN</h1>
        </div>
        {resource?.map((book, index) => (
          <div key={index} className="w-full flex flex-row">
            <h2>{book.title}</h2>
            <h2>{book.isbn}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
