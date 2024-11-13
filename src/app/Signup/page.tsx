"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import './page.css'; // Import the CSS file
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from '../../../Lib/firebase';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false); // State to control form visibility
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/Dashboard'); // Adjust the path as needed
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (showForm) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/Dashboard'); // Adjust the path as needed
      } catch (error) {
        console.error("Error signing up with email:", error);
      }
    }
  };

  return (
    <div className="register-container">
      {/* Background Image */}
      <div className="background-image-container">
        <Image 
          src="/mountbg.jpeg" 
          alt="Background" 
          fill 
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="background-image" 
          loading="eager" // Ensures the image is loaded immediately
          priority // Prioritizes the image for loading
        />
      </div>

      {/* Form Container */}
      <div className="form-container">
        <h3 className="text-white text-lg text-center tagline lg:text-xs">Journey to a trillion miles starts from here!!</h3>
        <div className="form-box">
          <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
          <h5 className="flex justify-center pb-16">Choose a sign up method</h5>
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-2 flex items-center justify-center space-x-2 text-white bg-[#192734] border-2 border-[#425568] rounded-md shadow-sm hover:bg-[#192734] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#425568]"
            >
              <Image src="/Icon/google.svg" alt="Google icon" width={24} height={24} />
              <span>Sign up with Google</span>
            </button>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-4 py-2 flex items-center justify-center space-x-2 text-white bg-[#192734] border-2 border-[#425568] rounded-md shadow-sm hover:bg-[#192734] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#425568]"
              >
                <EmailRoundedIcon />
                <span>Sign up with Email</span>
              </button>
            )}
            {showForm && (
              <form onSubmit={handleEmailSignUp} className="space-y-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-md"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 flex items-center justify-center space-x-2 text-white bg-[#192734] border-2 border-[#425568] rounded-md shadow-sm hover:bg-[#192734] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#425568]"
                >
                  <EmailRoundedIcon />
                  <span>Sign Up with Email</span>
                </button>
              </form>
            )}
          </div>
          <p className="text-sm pt-5 text-center text-gray-400">
            Already have an account? <Link href="/Login" className="text-indigo-600 hover:text-indigo-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
