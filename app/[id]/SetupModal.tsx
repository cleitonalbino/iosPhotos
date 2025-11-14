"use client";

import { memo } from "react";

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetupModal = memo(function SetupModal({
  isOpen,
  onClose,
}: SetupModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="no-swipe fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xs"></div>

      {/* Modal */}
      <div
        className="no-swipe relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
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
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-white mb-6">
          How to Set as Wallpaper
        </h2>

        <ol className="space-y-6 text-gray-300">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20">
              1
            </span>
            <div>
              <strong className="text-white block mb-1">
                Download the wallpaper
              </strong>
              <p className="text-sm leading-relaxed">
                Click the download button below. The image will be saved
                directly to your iPhone's Photos app.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20">
              2
            </span>
            <div>
              <strong className="text-white block mb-1">
                Open the Photos app
              </strong>
              <p className="text-sm leading-relaxed">
                Launch the Photos app on your iPhone and locate the downloaded
                wallpaper in your recent photos or downloads folder.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20">
              3
            </span>
            <div>
              <strong className="text-white block mb-1">
                Access wallpaper settings
              </strong>
              <p className="text-sm leading-relaxed">
                Tap the share icon (square with upward arrow) at the bottom
                left, then scroll down and select "Use as Wallpaper" from the
                menu.
              </p>
            </div>
          </li>

          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-semibold border border-white/20">
              4
            </span>
            <div>
              <strong className="text-white block mb-1">
                Position and apply
              </strong>
              <p className="text-sm leading-relaxed">
                Adjust the position by pinching to zoom or dragging the image.
                Choose whether to set it as your Lock Screen, Home Screen, or
                both, then tap "Set."
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
});

export default SetupModal;
