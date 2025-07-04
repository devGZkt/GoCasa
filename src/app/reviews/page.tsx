'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Review = {
  id: number;
  title: string;
  content: string;
  rating: number;
  user_id: number;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*');

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Reviews</h1>
      <p className="text-lg mb-2">This is the reviews page.</p>
      <p className="text-lg mb-6">You can view and manage reviews here.</p>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="border p-4 mb-4 max-w-md bg-white shadow-md rounded-lg w-full"
        >
          <h2 className="text-xl font-semibold">{review.title}</h2>
          <p className="text-gray-700">{review.content}</p>
          <p className="text-yellow-500">Rating: {review.rating}</p>
          <p className="text-gray-500">By User ID: {review.user_id}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
