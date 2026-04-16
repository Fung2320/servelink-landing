"use client";

interface Props {
  size?: number;
  className?: string;
}

export default function Logo({ size = 36, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Pin shape */}
        <path
          d="M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z"
          fill="#00342a"
        />
        {/* Inner circle */}
        <circle cx="24" cy="18" r="8" fill="#fecc00" />
        {/* Checkmark */}
        <path
          d="M20.5 18L23 20.5L28 15.5"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <span className="text-[#00342a]">Serve</span>
        <span className="text-[#735c00]">Link</span>
      </span>
    </div>
  );
}
