import React, { useRef, useEffect } from 'react';
import '../index.css'; // Ensure you have the necessary CSS for animations

// college dash

const Carousel = () => {
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    // This effect handles the mobile auto-sliding functionality
    const mobileCarousel = mobileCarouselRef.current;
    if (!mobileCarousel) return;
  }, []);

  return (
    <div className=" py-12">
<div class="bg-white rounded-lg shadow-sm border-gray-200 px-6 py-4 w-full max-w-7xl mx-auto">
        {/* Desktop Brands */}
        <div className="bg-white rounded-lg  border-gray-200 px-6 py-4 w-full max-w-7xl mx-auto hidden md:block">
          <div className="flex items-center justify-center gap-8 lg:gap-12 xl:gap-20 flex-wrap">
            <div className="flex items-center"><img alt="TRUST US" className="object-contain transition-all duration-300 hover:scale-105 w-32 h-32 lg:w-40 lg:h-40" src="/assets/TRUSTUS-C5USyvUL.png" /></div>
            <div className="flex items-center"><img alt="Amazon" className="object-contain transition-all duration-300 hover:scale-105 w-32 h-32 lg:w-40 lg:h-40" src="/assets/Amazon-D0EqrgiU.png" /></div>
            <div className="flex items-center"><img alt="Flipkart" className="object-contain transition-all duration-300 hover:scale-105 w-32 h-32 lg:w-40 lg:h-40" src="/assets/Flip-Bween-8u.png" /></div>
            <div className="flex items-center"><img alt="Walmart" className="object-contain transition-all duration-300 hover:scale-105 w-32 h-32 lg:w-40 lg:h-40" src="/assets/Wal-B9VZze0w.png" /></div>
            <div className="flex items-center"><img alt="HP" className="object-contain transition-all duration-300 hover:scale-105 w-16 h-16 lg:w-20 lg:h-20" src="/assets/HP-Bf2GcGpu.png" /></div>
          </div>
        </div>

        {/* Mobile Brands */}
        <div className="bg-white rounded-lg border-gray-200 px-6 py-4 w-full max-w-7xl mx-auto md:hidden">
          <div className="flex items-center justify-center h-32 overflow-hidden">
            <div ref={mobileCarouselRef} className="flex animate-slider w-full">
              {/* Note: The `animate-slider` keyframes would need to be in your global CSS file */}
              <div className="flex-shrink-0 flex items-center justify-center w-full"><img alt="TRUST US" className="object-contain w-28 h-28" src="/assets/TRUSTUS-C5USyvUL.png" /></div>
              <div className="flex-shrink-0 flex items-center justify-center w-full"><img alt="Amazon" className="object-contain w-28 h-28" src="/assets/Amazon-D0EqrgiU.png" /></div>
              <div className="flex-shrink-0 flex items-center justify-center w-full"><img alt="Flipkart" className="object-contain w-28 h-28" src="/assets/Flip-Bween-8u.png" /></div>
              <div className="flex-shrink-0 flex items-center justify-center w-full"><img alt="Walmart" className="object-contain w-28 h-28" src="/assets/Wal-B9VZze0w.png" /></div>
              <div className="flex-shrink-0 flex items-center justify-center w-full"><img alt="HP" className="object-contain w-16 h-16" src="/assets/HP-Bf2GcGpu.png" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;