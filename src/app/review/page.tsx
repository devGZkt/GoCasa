'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

const Review = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  type Review = {
    id: number;
    content: string;
    user_email?: string;
    // Add other fields as needed based on your "reviews" table structure
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lädt Session und Reviews
    const loadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      // Reviews holen
      const { data, error } = await supabase.from("reviews").select("*");

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data || []);
        console.log("Reviews fetched:", data);
      }

      setLoading(false);
    };

    loadData();
  }, [router, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Falls User aus irgendeinem Grund nicht gesetzt ist, noch Loading zeigen
    return <div>Loading user info...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-semibold">Welcome back!</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => router.push("/review")}
          className="px-4 py-2 m-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Review Page
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="px-4 py-2 m-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Log Out
        </button>

        <button
          onClick={() => router.push("/create-review")}
          className="px-4 py-2 m-2 bg-green-800 text-white rounded hover:bg-green-900 transition"
        >
          Create Review
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Your Reviews:</h2>
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mb-2 p-2 border rounded">
                <p>{review.content}</p>
                <small className="text-gray-500">
                  Posted by {review.user_email || "unknown"}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Review;
