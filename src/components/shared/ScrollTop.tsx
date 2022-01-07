import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DoubleArrow from './../shared/icons/DoubleArrow';

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={scrollToTop}
      className="fixed z-50 text-center text-white bg-primary-300 p-4 rounded-full cursor-pointer bottom-20 right-2 md:right-10"
    >
      <DoubleArrow />
    </div>
  );
};

export default ScrollTop;
