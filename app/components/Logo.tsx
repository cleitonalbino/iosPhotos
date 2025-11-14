export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* iPhone outline */}
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Dynamic Island */}
        <rect
          x="9"
          y="4"
          width="6"
          height="1.5"
          rx="0.75"
          fill="currentColor"
        />
        {/* Image icon inside */}
        <path
          d="M9 10L10.5 13L12 11L15 16H9V10Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle
          cx="13.5"
          cy="11"
          r="1"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>

      {/* Text */}
      <span className="font-semibold text-lg">iPhone Wallpapers</span>
    </div>
  );
}
