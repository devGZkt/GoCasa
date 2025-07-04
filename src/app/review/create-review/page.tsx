'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from '@supabase/supabase-js';

const CreateReview = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
    console.log(title)
    console.log(content)
    console.log(rating) 
    console.log(user ? user.id : null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    fetchUser();
  }, [supabase, router]);

  const HandleDbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

const { error } = await supabase
  .from("reviews")
  .insert([
    {
      title,
      content,
      rating,
      user_id: user.id
    },
  ]);


    if (error) {
      console.error("Error submitting review:", error.message);
      alert("Failed to submit review.");
    } else {
      alert("Review submitted!");
        router.push('/review')
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex h-screen w-full ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md m-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Create Review</h2>
        <form onSubmit={HandleDbSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter review title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">Content</label>
            <textarea
              id="content"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Write your review here"
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  className={`star ${index <= rating ? "active" : ""} text-yellow-500 cursor-pointer text-2xl`}
                  onClick={() => setRating(index)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
