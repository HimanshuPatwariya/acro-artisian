// src/components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../Lib/AuthContext';
import { signOut } from '../Lib/firebase';
import { FC } from 'react';

const Header: FC = () => {
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push('/Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-[#192734] p-4 px-8 flex items-center shadow-lg">
      <div className="flex-1">
        <Link href="/" className="text-white font-bold text-2xl hover:text-[#1DA1F2] transition-colors duration-300 ease-in-out">
          Local Artision
        </Link>
      </div>
      <button
        onClick={handleSignOut}
        className="text-white bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-200 ease-in-out shadow-md"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
