import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      className="fixed z-50 text-center text-white cursor-pointer bottom-0 right-2 md:right-10"
    >
      <Image
        width={32}
        height={32}
        src="/icons/back_to_top.svg"
        alt="up top"
        className="z-50 text-center"
      />
    </div>
  );
};

export default ScrollTop;
