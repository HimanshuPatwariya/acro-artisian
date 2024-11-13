"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Import Image component
import Header from '../../../Component/Header';

export default function ArtisanDashboard() {
  const [artisans, setArtisans] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const itemWidth = 300; // Width of the component in pixels

  useEffect(() => {
    fetch('/Artisans.json') // Ensure this JSON file has artisan data
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched artisans:', data); // Log fetched data
        setArtisans(data);
      })
      .catch(error => console.error('Error loading artisans:', error));
  }, []);

  const slideRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artisans.length);
  };

  const slideLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artisans.length) % artisans.length);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.changedTouches[0].clientX);
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      slideRight(); // Swipe left
    } else if (distance < -50) {
      slideLeft(); // Swipe right
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 bg-[#192734] min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Support Local Artisans 🌍</h1>
        <div className="relative flex items-center">
          <button
            onClick={slideLeft}
            className="absolute left-0 p-4 bg-gray-800 text-white rounded-full focus:outline-none z-10"
          >
            &lt;
          </button>
          <div
            className="overflow-hidden w-full"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {artisans.length > 0 ? (
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
              >
                {artisans.map((artisan, index) => (
                  <div key={index} className="w-[300px] flex-shrink-0 p-4 border-2 border-white bg-[#192734] rounded-lg shadow-md m-4">
                    <div className="flex items-start">
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          src={artisan.img} // Ensure this path is correct and accessible
                          alt={artisan.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <h2 className="text-xl font-semibold text-white mb-2">{artisan.name}</h2>
                        <p className="text-sm text-white mb-4">{artisan.description}</p>
                      </div>
                    </div>
                    <a
                      href="#" // Update this href with the correct link to support or learn more
                      className="block w-full px-4 py-2 text-white bg-[#192734] border-2 border-white rounded-md text-center mt-4"
                    >
                      Learn More
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center">Loading artisans...</p>
            )}
          </div>
          <button
            onClick={slideRight}
            className="absolute right-0 p-4 bg-gray-800 text-white rounded-full focus:outline-none z-10"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
