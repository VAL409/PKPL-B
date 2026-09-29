import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function LightboxModal({ image, title, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden flex items-center justify-center bg-black/40">
          <img
            src={image}
            alt={title || 'Pratinjau Tanaman'}
            className="max-h-[75vh] w-auto object-contain rounded-t-2xl"
          />
        </div>

        {/* Caption */}
        {title && (
          <div className="p-4 bg-stone-900 text-center border-t border-stone-800">
            <h4 className="font-heading font-bold text-white text-base tracking-wide">
              {title}
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              Pratinjau Tampilan Tanaman Hias GreenLeaf
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
