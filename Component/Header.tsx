// src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../Lib/AuthContext'; // Import useAuth
import { signOut } from '../Lib/firebase'; // Import signOut

const Header = () => {
  const router = useRouter();
  const auth = useAuth(); // Get the auth instance from context

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out using Firebase
      router.push('/Login'); // Redirect to login or any other route after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-[#192734] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src="/Logo/Frame 4.png" // Path to your logo
          alt="Logo"
          width={120} // Adjust width as needed
          height={40} // Adjust height as needed
          className="rounded-md"
        />
      </div>
      <button
        onClick={handleSignOut}
        className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
