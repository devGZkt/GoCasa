'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

import Nav from "../components/Nav";

export default function Home() {

  const [topReviews, setTopReviews] = useState([]);

useEffect(() => {
  const fetchTopReviews = async () => {
    const { data: topReviews, error } = await supabase
      .from('top_reviews')
      .select(`
        position,
        reviews (
          id,
          title,
          content,
          rating,
          user_id
        )
      `)
      .order('position', { ascending: true });

    if (error) {
      console.error("Error fetching top reviews:", error.message);
    } else {
      setTopReviews(topReviews);
    }
  };

  fetchTopReviews();
}, []);


  return (
<div>
  <div className="h-20 bg-gray-800">
    <Nav />
  </div>
  <div className="h-120 bg-green-500">
    <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
      Hero Section
    </div>
  </div>
  <div className="h-120 bg-blue-500">
    <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
      Rent Page with btn
    </div>
  </div>
  <div className="h-120 bg-red-500">
    <div className="flex flex-col items-center justify-center h-full text-4xl font-bold text-white">
      User Experience
      <div className="mt-6 w-full max-w-3xl">
    {topReviews?.length > 0 ? (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
        {topReviews.map(({ position, reviews: review }) => (
          <div
            key={review.id}
            className="p-3 rounded-lg bg-white shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 truncate">{review.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{review.content}</p>
            <div className="mt-2 text-sm text-yellow-500">⭐ {review.rating}</div>
            <div className="text-xs text-gray-400">User: {review.user_id.slice(0, 8)}…</div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-white text-sm italic">No top reviews available.</p>
    )}

      </div>
    </div>
  </div>
  <div className="h-20 bg-yellow-500">
    <div className="flex items-center justify-center h-full text-4xl font-bold text-white">
      ©Copyright Gabriel Zimmermann
    </div>
  </div>
</div>

  );
}