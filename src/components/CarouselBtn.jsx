import React, { useState } from 'react';

// collegedash

const CarouselBtn = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 3;

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide % totalSlides) + 1);
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 2 + totalSlides) % totalSlides + 1);
  };

  const goToSlide = (slideNumber) => {
    setActiveSlide(slideNumber);
  };

  const transformValue = `translateX(-${(activeSlide - 1) * 100}%)`;

  return (
    <div className=" py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden">
          {/* Carousel Wrapper */}
          <div
            id="carousel"
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: transformValue }}
          >
            {/* Slide 1 */}
            <div className="w-full flex-shrink-0">
              <div className="flex gap-6">
                <div className="flex-1 relative">
                  <img
                    alt="Architecture interior"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-gray-800 font-bold text-lg">G</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <img
                    alt="Milan Cathedral"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="w-full flex-shrink-0">
              <div className="flex gap-6">
                <div className="flex-1 relative">
                  <img
                    alt="Modern building"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                </div>
                <div className="flex-1 relative">
                  <img
                    alt="Classic architecture"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-gray-800 font-bold text-lg">G</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="w-full flex-shrink-0">
              <div className="flex gap-6">
                <div className="flex-1 relative">
                  <img
                    alt="City skyline"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                </div>
                <div className="flex-1 relative">
                  <img
                    alt="Historic building"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    src="https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?cs=srgb&dl=pexels-ingo-188035.jpg&fm=jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left w-6 h-6 text-gray-700"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right w-6 h-6 text-gray-700"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index + 1)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activeSlide === index + 1
                  ? 'bg-blue-600 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            ></button>
          ))}
        </div>

        {/* Slide Indicator */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          {activeSlide} / {totalSlides}
        </div>
      </div>
    </div>
  );
};

export default CarouselBtn;