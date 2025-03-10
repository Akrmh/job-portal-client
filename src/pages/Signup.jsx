import React, { useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation to the sign-in page

const Signup = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const navigate = useNavigate();

  // Handle Email & Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Signed Up:", userCredential.user);
      navigate("/signin"); // Redirect to sign-in page after successful signup
    } catch (error) {
      console.error("Signup Error:", error.message);
      setError("Error signing up, please try again.");
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Signup Error:", error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-[20rem] h-screen">
        <h2 className="text-2xl font-semibold text-center mb-3">Create Account</h2>

        {/* Email & Password Signup */}
        <form className="space-y-2" onSubmit={handleSignup}>
          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Display error message if passwords do not match */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-blue/90 hover:bg-blue text-white py-2 px-6 rounded-lg w-full">
            Sign Up
          </button>
        </form>

        {/* Social Signup */}
        <div className="text-center mt-4 text-gray-500 text-sm">Or sign up with</div>
        <div className="flex justify-center gap-4 mt-2">
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handleGoogleSignup}>
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaLinkedin className="text-blue-700 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaInstagram className="text-pink-500 text-xl" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-2">©2023 JobPortal. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Signup;
