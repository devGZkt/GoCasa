'use client';

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const Login = () => {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = async (email: string, password: string) => {
    // Check user credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // Handle login response
    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      console.log("User logged in successfully:", data);
      setIsAuthenticated(true);
    }
    
    // Redirect to home page if login is successful
    if (isAuthenticated){
      router.push("/");
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-400">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            onClick={(e) => {
              e.preventDefault();
              handleLogin(username, password);
            }}
          >
            Login
          </button>
          {/* Don't have a account? Sign Up link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            {`Don't have an account?`} <a href="/signup" className="text-blue 0 hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;