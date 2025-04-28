'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase/server';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: items, error } = await supabase.from('books').select("title,isbn");
      if (error) console.error(error);
      else setData(items);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className=''>
      <h1 className='mb-4 text-4xl bg-green-700 text-white p-4 text-center'>Data from Supabase</h1>
      <table className='bg-slate-100 p-4'>
        <thead className='bg-slate-200 font-bold'>
        <tr >
          <td className='p-2 m-1  border border-gray-300'>ID</td>
          <td className='p-2 m-1  border border-gray-300'> Title </td>
          <td className='p-2 m-1  border border-gray-300'> ISBN </td>
          <td className='p-2 m-1  border border-gray-300'> Author </td>
          <td className='p-2 m-1  border border-gray-300'> Genre </td>
        </tr>
        </thead>
        <tbody>
        {data.map(item => (
        <tr key={item.isbn}>
          <td className='p-2 m-1  border border-gray-300'>{item.id} </td>
          <td className='p-2 m-1  border border-gray-300'>{item.title}</td> 
          <td className='p-2 m-1  border border-gray-300'>{item.isbn}</td>
          <td className='p-2 m-1  border border-gray-300'>{item.author}</td>
          <td className='p-2 m-1  border border-gray-300'>{item.genre}</td>         
        </tr>
        ))}
      </tbody>
      <caption className='caption-top text-sm text-thin font-light'>
  Table 3.1 books presented by the FH Group.
      </caption>
      </table>
    </div>
  );
}