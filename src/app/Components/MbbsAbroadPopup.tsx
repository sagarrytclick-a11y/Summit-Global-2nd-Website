"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MbbsAbroadPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    // Auto-hide after 10 seconds when popup is visible
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1832] shadow-2xl animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all hover:scale-110 hover:bg-white"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        <img
          src="/mbbsbanner.png"
          alt="MBBS Abroad"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default MbbsAbroadPopup;
