import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 48,
  showGlow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full bg-[#2fd9f4]/20 blur-md pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          <linearGradient id="dropGradient" x1="50" y1="18" x2="50" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2fd9f4" />
            <stop offset="30%" stopColor="#0088cc" />
            <stop offset="70%" stopColor="#005080" />
            <stop offset="100%" stopColor="#06203a" />
          </linearGradient>
          <linearGradient id="waveGrad" x1="38" y1="52" x2="82" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f7fa" />
            <stop offset="40%" stopColor="#4cd7f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="haloGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Dashed Halo Ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="#52b8ff"
          strokeWidth="3.2"
          strokeDasharray="5.5 4.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Soft Inner Halo Glow */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="#2fd9f4"
          fillOpacity="0.08"
        />

        {/* Water Droplet Base */}
        <path
          d="M50 18C50 18 26 50 26 66C26 79.25 36.75 85 50 85C63.25 85 74 79.25 74 66C74 50 50 18 50 18Z"
          fill="url(#dropGradient)"
          stroke="#4cd7f6"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* Inner Droplet Contour Line */}
        <path
          d="M50 22C50 22 31 52 31 66C31 76.5 39.5 81 50 81C60.5 81 69 76.5 69 66C69 52 50 22 50 22Z"
          stroke="#8aebff"
          strokeWidth="0.75"
          strokeOpacity="0.3"
        />

        {/* Sub-surface Arc / Basalt floor reflection */}
        <path
          d="M34 68C40 63 60 63 66 68"
          stroke="#22d3ee"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Droplet Bubble Highlight */}
        <circle
          cx="44"
          cy="42"
          r="3.2"
          fill="#e0f7fa"
          opacity="0.9"
        />

        {/* Dynamic Oceanic Wave S-curve */}
        <path
          d="M40 54C45 50 49 53 55 54C62 55 70 59 81 54"
          stroke="url(#waveGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
