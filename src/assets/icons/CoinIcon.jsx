export const CoinIcon = (props) => {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        cx="23.5781"
        cy="23.9693"
        rx="23.5781"
        ry="23.2154"
        fill="#EFC269"
      />
      <path
        d="M44.8423 23.9693C44.8423 35.5051 35.3299 44.871 23.5779 44.871C11.8259 44.871 2.31348 35.5051 2.31348 23.9693C2.31348 12.4335 11.8259 3.06763 23.5779 3.06763C35.3299 3.06763 44.8423 12.4335 44.8423 23.9693Z"
        fill="url(#paint0_linear_438_5)"
        stroke="url(#paint1_linear_438_5)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_438_5"
          x1="10.217"
          y1="7.82736"
          x2="40.2035"
          y2="40.5949"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E2BC62" />
          <stop offset="0.5" stopColor="#FBD772" />
          <stop offset={1} stopColor="#E2BC62" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_438_5"
          x1="7.85915"
          y1="7.16234"
          x2="32.8278"
          y2="45.371"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AC8130" />
          <stop offset={1} stopColor="#F7E18B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CoinIcon;
